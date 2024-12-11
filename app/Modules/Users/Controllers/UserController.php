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
        $roles = Role::get();
        $roles = $roles->slice(1);
        return view('users::index', compact('roles'));
    }

    public function save(Request $request)
    {
        try {
            $user      = Auth::user();
            $clientID  = $user->client_id;
            $request->validate([
                // 'name' => ['required', 'string', 'max:255', 'unique:' . User::class . ',name'],
                'name' => [
                    'required',
                    'string',
                    Rule::unique('users', 'name')
                        ->where('client_id', $clientID)
                        ->ignore($clientID),
                ],
                'role' => 'required',
                // 'email' => ['required', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')
                        ->where('client_id', $clientID)
                        ->ignore($clientID),
                ],
                // 'userpassword' => ['required', Rules\Password::defaults()],
            ]);

            $role         = $request->role;
            $password     = Str::random(8) . '@' . rand(100, 999);

            $user                   =  User::create([
                'name'              => $request->name,
                'client_id'         => $clientID,
                'email'             => $request->email,
                'display_name'      => $request->displayName,
                'phone'             => $request->phone,
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
            $roleName = $user->getRoleNames()->first();
            $user->role = $roleName;
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
            $client          = Client::findOrFail($id);
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

            $id                    = $request->input('id');
            $name                  = $request->input('editName');
            $email                 = $request->input('editEmail');
            $editDisplayName       = $request->input('editDisplayName');
            $editPhone             = $request->input('editPhone');

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
            $user->save();

            $user->assignRole([$role]);

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
        $columns = ['id', 'name'];
        $limit   = $request->input('length', 10);
        $start   = $request->input('start', 0);
        $search  = $request->input('search')['value'];

        $query = User::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
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
            if (Auth::user()->can('users.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('users.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            return [
                'id' => $data->id,
                'name' => $data->name,
                'email' => $data->email,
                'action' => $editAction . $deleteAction,
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
}
