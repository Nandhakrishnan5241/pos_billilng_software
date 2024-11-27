<?php

namespace App\Modules\Roles\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::get();
        return view('roles::index', compact("roles"));
    }

    public function save(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'string',
                'unique:roles,name,except,id'
            ]);

            Role::create([
                'name' => $request->name
            ]);

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
            $data = Role::findOrFail($id);
            return response()->json($data);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName'   => 'required',
            ]);

            $id      = $request->input('id');
            $name    = $request->input('editName');

            $permission          = Role::find($id);
            $permission->name    = $name;
            $permission->save();

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
            $module = Role::findOrFail($id);
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

        $query = Role::query();

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
            return [
                'id' => $data->id,
                'name' => $data->name,
                'action' => '
                    <a href="#" class="btn  text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a> 
                    <a href="#" class="btn  text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>
                ',
            ];
        });

        $totalRecords = Role::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'),
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $filteredRecords,
            'data' => $data,
        ]);
    }

    public function addPermissionToRole($roleId)
    {
        dd('test');
        if (!empty($roleId)) {
            $permissions     = Permission::get();
            $role            = Role::findOrFail($roleId);
            $rolePermissions = DB::table('role_has_permissions')
                ->where('role_has_permissions.role_id', $role->id)
                ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
                ->all();
            $data = [];
            $data['permissions']     = $permissions;
            $data['role']            = $role;
            $data['rolePermissions'] = $rolePermissions;

            return view('roles::addpermission', compact('role', 'permissions', 'rolePermissions'));
        }
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        dd('test');
        try {
            $request->validate([
                'permissions' => 'required'
            ]);
            dd($request);
            $role = Role::findOrFail($roleId);
            $role->syncPermissions($request->permissions);

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
}
