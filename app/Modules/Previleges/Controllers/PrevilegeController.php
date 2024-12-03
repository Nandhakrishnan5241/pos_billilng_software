<?php

namespace App\Modules\Previleges\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Module\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PrevilegeController extends Controller
{
    public function index()
    {
        $user    = Auth::user();
        $userId  = $user->id;
        $roleIds = $user->roles->pluck('id'); 
        $rollId  = $roleIds[0];

        $permissions        = Permission::get();
        $roles              = Role::get();
        $modules            = Module::get();
        $roleHasPermissions = PrevilegeController::getPermissionsByUserIdAndRoleId($userId, $rollId);
        
        return view('previleges::index', compact("roles", "modules","permissions","roleHasPermissions"));
    }

    public static function getPermissionsByUserIdAndRoleId($userId, $roleId)
    {
        $rolePermissions = [];
        try {
            $permissions = DB::table('permissions')
                ->join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->where('role_has_permissions.role_id', $roleId)
                ->select('permissions.name')
                ->get();

            foreach($permissions as $permission){
                array_push($rolePermissions,$permission->name);
            }
            return $rolePermissions; 
        } 
        
        catch (ValidationException $e) {
            return $rolePermissions; 
        }
    }


    public function addPermissionToRoles($roleId)
    {
        $permissions     = Permission::get();
        $role            = Role::findOrFail($roleId);
        $rolePermissions = DB::table('role_has_permissions')
            ->where('role_has_permissions.role_id', $role->id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return view('roles.add-permission', compact('role', 'permissions', 'rolePermissions'));
    }

    public function addPermissionToRole($roleId, $groupedData)
    {
        $user = Auth::user();
        try {
            $decodeData = json_decode($groupedData, true);
            $role       = Role::findOrFail($roleId);
            

            $permissions = [];
            foreach ($decodeData as $data) {
                $moduleSlug = $data['module']['slug'];
                $actions    = $data['actions'];

                foreach ($actions as $action) {
                    $permissionName = "{$moduleSlug}.{$action}";
                    $permission     = Permission::firstOrCreate(['name' => $permissionName]);
                    $permissions[]  = $permissionName;
                }
            }
            $role->syncPermissions($permissions);

            return response()->json([
                'status' => '1',
                'message' => 'Permission for the role was successfully granted....',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'The role"s assigned permissions failed....',
                'data' => [],
            ]);
        }
    }
}
