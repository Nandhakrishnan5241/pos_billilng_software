<?php

namespace App\Modules\Previleges\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Module\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PrevilegeController extends Controller
{
    public function index()
    {
        $roles = Role::get();
        $modules = Module::get();
        return view('previleges::index', compact("roles","modules"));
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
