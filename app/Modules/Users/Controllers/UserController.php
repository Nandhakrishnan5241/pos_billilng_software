<?php

namespace App\Modules\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $roles = Role::get();
        return view('users::index',compact('roles'));
    }

    public function save(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'role' => 'required',
                'email' => ['required', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
                'userpassword' => ['required', Rules\Password::defaults()],
            ]);
            $role = $request->role;
            $user   = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->userpassword),
            ]);
            $user->assignRole([$role]);

            return response()->json([
                'status' => '1',
                'message' => 'Data Saved Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Data Saved Failed...',
                'data' => [],
            ]);
        }
    }
    public function edit($id = '')
    {
        if (!empty($id)) {
            $data = User::findOrFail($id);
            return response()->json($data);
        }
    }
    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName' => ['required', 'string', 'max:255'],
                'editEmail' => ['required', 'lowercase', 'email', 'max:255'],
            ]);

            $id          = $request->input('id');
            $name        = $request->input('editName');
            $email       = $request->input('editEmail');

            $user          = User::find($id);
            $user->name    = $name;
            $user->email    = $email;
            $user->save();

            return response()->json([
                'status' => '1',
                'message' => 'Data Updated Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Data Updated Failed...',
                'data' => [],
            ]);
        }
    }

    public function delete($id)
    {
        try {
            $module = User::findOrFail($id);
            $module->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
