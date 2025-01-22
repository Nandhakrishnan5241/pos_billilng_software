<?php

namespace App\Modules\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\SendClientDetails;
use App\Models\User;
use App\Modules\Clients\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        $roles   = Role::get();
        $roles   = $roles->slice(1);
        $clients = Client::get();
        $clients = $clients->slice(1);
        return view('users::index', compact('roles', 'clients'));
    }

    public function save(Request $request)
    {
        try {
            $user      = Auth::user();
            if($request->client_id){
                $clientID  = $request->client_id;
            }else{
                $clientID  = $user->client_id;
            }
            $request->validate([
                'name' => [
                    'required',
                    'string',
                    Rule::unique('users', 'name')
                        ->where('client_id', $clientID)
                        ->ignore($clientID),
                ],
                'role' => 'required',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')
                        ->where('client_id', $clientID)
                        ->ignore($clientID),
                ],
                
            ]);

            $role         = $request->role;
            // $password     = Str::random(8) . '@' . rand(100, 999);
            $password     = '12345678';

            $user                   =  User::create([
                'name'              => $request->name,
                'client_id'         => $clientID,
                'email'             => $request->email,
                'display_name'      => $request->displayName,
                'phone'             => $request->phone,
                'full_phone'        => $request->phone_number,
                'country_code'      => $request->country_code,
                'password'          => $password,
                // 'password'          => Hash::make($request->userpassword),
            ]);
            $user->assignRole([$role]);

            SendClientDetails::dispatch($user, $password);

            return response()->json([
                'status' => '1',
                'message' => 'Data Saved Successfully...',
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

    public function edit($id = '')
    {
        if (!empty($id)) {
            $user = User::findOrFail($id);
            // $roleNames = $user->getRoleNames();
            // $roleName = $user->getRoleNames()->first();
            // $user->role = $roleName;
            $userRoles = $user->roles->pluck('name', 'name')->all();
            $user->role = $userRoles;
            return response()->json($user);
        }
    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user->primary_admin == 1) {
                $requestResponse =  UserController::deleteClientByClientByID($user->client_id);
                if (!$requestResponse) {
                    return response()->json(['status' => 200, 'success' => 'Data Deleted Failed.']);
                }
            }
            $user->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function deleteClientByClientByID($id)
    {
        try {
            $client        = Client::findOrFail($id);
            $deletedRows   = Client::where('id', $id)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::user();
            $request->validate([
                'editName' => ['required', 'string', 'max:255', Rule::unique('users', 'name')->ignore($request->input('id'))],
                'editEmail' => ['required', 'lowercase', 'email', 'max:255', Rule::unique('users', 'email')->ignore($request->input('id'))],
            ]);

            $id                         = $request->input('id');
            $name                       = $request->input('editName');
            $email                      = $request->input('editEmail');
            $editDisplayName            = $request->input('editDisplayName');
            $editPhone                  = $request->input('editPhone');
            $full_edited_phone          = $request->input('edit_phone_number');
            $edit_country_code          = $request->input('edit_country_code');

            $user = User::findOrFail($id);
            if ($user->primary_admin == 1) {
                $requestResponse = UserController::updateClientDetailsByClientID($user->client_id, $name, $email);
                if (!$requestResponse) {
                    return response()->json([
                        'status' => '0',
                        'message' => 'Data Updated Failed...',
                        'data' => [],
                    ]);
                }
            }

            $role = $request->editRole;

            $user                  = User::find($id);
            $user->name            = $name;
            $user->email           = $email;
            $user->display_name    = $editDisplayName;
            $user->phone           = $editPhone;
            $user->full_phone      = $full_edited_phone;
            $user->country_code    = $edit_country_code;
            $user->save();

            // $user->assignRole([$role]);
            $user->syncRoles($role);

            return response()->json([
                'status' => '1',
                'message' => 'Data Updated Successfully...',
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

    public static function updateClientDetailsByClientID($clientID, $name, $email)
    {
        try {
            $client                    = Client::find($clientID);
            $client->company_name      = $name;
            $client->email             = $email;
            $client->save();
            return true;
        } catch (ValidationException $e) {
            return  false;
        }
    }

    public function getDetails(Request $request)
    {
        $user      =  Auth::user();
        $client_id = $user->client_id;
        $columns   = ['id', 'name'];
        $limit     = $request->input('length', 10);
        $start     = $request->input('start', 0);
        $search    = $request->input('search')['value'];

        $query = User::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        if ($request->has('client_id') && $request->client_id) {
            $query->where('client_id', $request->client_id);
        } else {
            if ($client_id != 1) {
                $query->where('client_id', $client_id);
            }
        }

        $orderColumnIndex = $request->input('order.0.column');
        $orderDirection = $request->input('order.0.dir');

        if ($orderColumnIndex !== null) {
            $orderColumn = $columns[$orderColumnIndex];
            $query->orderBy($orderColumn, $orderDirection);
        }

        $datas = $query->skip($start)->take($limit)->get();
        $data = $datas->map(function ($data) {
            $roles = $data->getRoleNames(); // Collection of roles
            $roleName = '';
            foreach ($roles as $role) {
                $roleName .= '<label class="badge bg-primary mx-1">' . $role . '</label>';
            }
            $editAction    = '';
            $deleteAction  = '';
            $changePassword  = '';
            if (Auth::user()->can('users.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('users.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            if (Auth::user()->hasRole('superadmin')) {
                $changePassword = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="changePassword(' . $data->id . ')"><i class="fa-solid fa-lock"></i></a>';
            }
            return [
                'id' => $data->id,
                'name' => $data->display_name,
                'email' => $data->email,
                'role' => $roleName,
                'action' => $editAction . $deleteAction . $changePassword,
            ];
        });

        $totalRecords = User::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'),
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $filteredRecords,
            'data' => $data,
        ]);
    }

    public function changePassword(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required',
            ]);
            $id = $request->changePasswordID;

            $password       = $request->password;
            $user           = User::find($id);
            $user->password = $password;
            $user->save();
            SendClientDetails::dispatch($user, $password);

            return response()->json([
                'status' => 1,
                'msg' => 'Password Updated Successfully...',
                'data' => []
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
}
