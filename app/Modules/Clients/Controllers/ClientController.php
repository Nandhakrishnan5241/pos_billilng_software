<?php

namespace App\Modules\Clients\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\SendClientDetails;
use App\Models\Timezone;
use App\Models\User;
use App\Modules\Clients\Models\Client;
use App\Modules\Module\Models\Module;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class ClientController extends Controller
{
    public function index()
    {
        // $user = Auth::user(); 
        // $client = Client::find($user->client_id);

        // $modules = $client->modules;
        // dd($modules);
        
        $roles     = Role::get();
        $modules   = Module::where('dashboard', 1)->get();
        $timezones = Timezone::get();

        return view('clients::index', compact('roles', 'modules','timezones'));
    }

    public function edit($id = '')
    {
        if (!empty($id)) {
            $client = Client::findOrFail($id);
            $moduleIds = DB::table('client_has_modules')
                ->where('client_id', $id)
                ->pluck('module_id');
            return response()->json([
                'status' => '1',
                'message' => 'data get by client ID...',
                'data' => ['client' => $client, 'moduleIds' => $moduleIds]
            ]);
            // return response()->json($client,$moduleIds);
        }
    }

    public function delete($id)
    {
        try {
            $client          = Client::findOrFail($id);
            $requestResponse =  ClientController::deleteUserByClientByID($client->id);
            if (!$requestResponse) {
                return response()->json(['status' => 200, 'success' => 'Data Deleted Failed.']);
            }
            $client->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function deleteUserByClientByID($clientID)
    {
        try {
            $deletedRows   = User::where('client_id', $clientID)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function save(Request $request)
    {
        try {
            $selectedModulesId   = $request->input('modules', []);
            $request->validate([
                'name' => ['required', 'string', 'max:255', 'unique:' . Client::class . ',company_name'],
                'email' => ['required', 'lowercase', 'email', 'max:255', 'unique:' . Client::class],
                'phone' => 'required',
                'address' => 'required',
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $imageName = time() . '.' . $request->logo->extension();
            $imagePath = 'images/clients/';
            $fullPath  = $imagePath . $imageName;
            $request->logo->move(public_path($imagePath), $imageName);

            $name          = $request->input('name');
            $email         = $request->input('email');
            $phone         = $request->input('phone');
            $full_phone    = $request->input('phone_number');
            $country_code  = $request->input('country_code');
            $address       = $request->input('address');
            $city          = $request->input('city');
            $pincode       = $request->input('pincode');
            $state         = $request->input('state');
            $country       = $request->input('country');
            $subscribe     = $request->input('subscribe');
            $timezone      = $request->input('timezone');
            $fullPath      = '../../' . $fullPath;

            $client                    = new Client();

            $client->company_name      = $name;
            $client->company_logo      = $fullPath;
            $client->email             = $email;
            $client->phone             = $phone;
            $client->full_phone        = $full_phone;
            $client->country_code      = $country_code;
            $client->is_subscribed     = $subscribe;
            $client->address           = $address;
            $client->city              = $city;
            $client->pincode           = $pincode;
            $client->state             = $state;
            $client->country           = $country;
            $client->timezone_id       = $timezone;


            $client->save();

            // $password     = Str::random(8) . '@' . rand(100, 999);
            $password     = '12345678';
            $hashPassword =  Hash::make($password);

            $clientID      = $client->id;
            $role          = 'admin';

            if ($clientID) {
                try {
                    $request->validate([
                        'name' => [
                            'required',
                            'string',
                            Rule::unique('users', 'name')
                                ->where('client_id', $clientID)
                                ->ignore($clientID),
                        ],
                        'email' => [
                            'required',
                            'email',
                            Rule::unique('users', 'email')
                                ->where('client_id', $clientID)
                                ->ignore($clientID),
                        ],
                    ]);
                    $user = new User();
                    $user->client_id       = $clientID;
                    $user->name            = $name;
                    $user->email           = $email;
                    $user->display_name    = $name;
                    $user->password        = $hashPassword;
                    $user->phone           = $phone;
                    $user->full_phone      = $full_phone;
                    $user->country_code    = $country_code;
                    $user->primary_admin   = 1;
                    $user->save();

                    $user->assignRole([$role]);

                    SendClientDetails::dispatch($user, $password);
                } catch (ValidationException $e) {
                    $errors      = $e->validator->errors();
                    $allMessages = $errors->all();
                    return response()->json([
                        'status' => '0',
                        'message' => $allMessages[0],
                        'data' => [],
                    ]);
                }
            }

            $requestResponse = ClientService::syncPermissionsToClient($selectedModulesId);
            $requestResponse = ClientService::syncModulesToClient($clientID, $selectedModulesId);
            
            if ($requestResponse) {
                return response()->json([
                    'status' => '1',
                    'message' => 'Data Saved Successfully...',
                    'data' => [],
                ]);
            } else {
                return response()->json([
                    'status' => '0',
                    'message' => $requestResponse['message'],
                    'data' => [],
                ]);
            }
        } catch (ValidationException $e) {
            $errors      = $e->validator->errors();
            $allMessages = $errors->all();
            return response()->json([
                'status' => '0',
                'message' => $allMessages[0],
                'data' => [],
            ]);
        }
    }


    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('clients', 'company_name')->ignore($request->input('id'))
                ],
                'editEmail' => [
                    'required',
                    'email',
                    Rule::unique('clients', 'email')->ignore($request->input('id')),
                ],
                'editPhone' => 'required',
                'editAddress' => 'required',
            ]);


            $id                  = $request->input('id');
            $name                = $request->input('editName');
            $email               = $request->input('editEmail');
            $phone               = $request->input('editPhone');
            $full_edited_phone   = $request->input('edit_phone_number');
            $edit_country_code   = $request->input('edit_country_code');
            $address             = $request->input('editAddress');
            $city                = $request->input('editCity');
            $pincode             = $request->input('editPincode');
            $state               = $request->input('editState');
            $country             = $request->input('editCountry');
            $superadmin          = $request->input('superadmin');
            $subscribe           = $request->input('subscribe');
            $timezone            = $request->input('editTimezone');
            $currentImage        = $request->input('currentImage');

            $selectedModulesId   = $request->input('editModules', []);

            if (!empty($request->editLogo)) {
                $imageName = time() . '.' . $request->editLogo->extension();
                $imagePath = 'images/clients/';
                $fullPath  = $imagePath . $imageName;
                $request->editLogo->move(public_path($imagePath), $imageName);
                $fullPath    = '../../' . $fullPath;
            } else {
                $fullPath    = $currentImage;
            }

            $client                    = Client::find($id);

            if ($client->company_name != $name || $client->email != $email) {
                $requestResponse =  ClientController::updateUsersDetailsByClientID($id, $name, $email);
                if (!$requestResponse) {
                    return response()->json([
                        'status' => '0',
                        'message' => 'Data Updated Failed...',
                        'data' => [],
                    ]);
                }
            }

            $client->company_name      = $name;
            $client->company_logo      = $fullPath;
            $client->email             = $email;
            $client->phone             = $phone;
            $client->full_phone        = $full_edited_phone;
            $client->country_code      = $edit_country_code;
            $client->is_superadmin     = $superadmin;
            $client->is_subscribed     = $subscribe;
            $client->address           = $address;
            $client->city              = $city;
            $client->pincode           = $pincode;
            $client->state             = $state;
            $client->country           = $country;
            $client->timezone_id       = $timezone;

            $client->save();

            $requestResponse = ClientService::syncPermissionsToClient($selectedModulesId);
            $requestResponse = ClientService::syncModulesToClient($id, $selectedModulesId);

            return response()->json([
                'status' => '1',
                'message' => 'Data updated Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            $errors      = $e->validator->errors();
            $allMessages = $errors->all();
            return response()->json([
                'status' => '0',
                'message' => $allMessages[0],
                'data' => [],
            ]);
        }
    }

    public static function updateUsersDetailsByClientID($clientID, $name, $email)
    {
        try {
            $userData        = User::where('client_id', $clientID)->first();
            $user            = User::find($userData->id);
            $user->name      = $name;
            $user->email     = $email;
            $user->save();
            return true;
        } catch (ValidationException $e) {
            return  false;
        }
    }


    public function getDetails(Request $request)
    {
        $columns = ['id', 'company_name', 'email', 'mobile', 'company_logo'];
        $limit   = $request->input('length', 10);
        $start   = $request->input('start', 0);
        $search  = $request->input('search')['value'];

        $query = Client::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('company_name', 'like', '%' . $search . '%');
            });
        }

        $orderColumnIndex = $request->input('order.0.column');
        $orderDirection = $request->input('order.0.dir');

        if ($orderColumnIndex !== null) {
            $orderColumn = $columns[$orderColumnIndex];
            $query->orderBy($orderColumn, $orderDirection);
        }

        $datas = $query->skip($start)->take($limit)->get();

        $data = $datas->map(function ($data) {
            $editAction    = '';
            $deleteAction  = '';
            if (Auth::user()->can('clients.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('clients.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            return [
                'id' => $data->id,
                'company_name' => $data->company_name,
                'email' => $data->email,
                'mobile' => $data->phone,
                'company_logo' => '<img src="' . Storage::url($data->company_logo) . '" width="100" >',
                'action' => $editAction . $deleteAction,
            ];
        });

        $totalRecords = Client::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'),
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $filteredRecords,
            'data' => $data,
        ]);
    }
}
