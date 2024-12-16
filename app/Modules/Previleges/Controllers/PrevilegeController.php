<?php

namespace App\Modules\Previleges\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Clients\Models\Client;
use App\Modules\Module\Models\Module;
use App\Services\ClientService;
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
        $roles              = $roles->slice(1);
        $modules            = Module::get();
        $clients            = Client::get();
        $clients            = $clients->slice(1);

        $roleHasPermissions = PrevilegeController::getPermissionsByUserIdAndRoleId($userId, $rollId);

        return view('previleges::index', compact("roles", "modules", "permissions", "roleHasPermissions", 'clients'));
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

            foreach ($permissions as $permission) {
                array_push($rolePermissions, $permission->name);
            }
            return $rolePermissions;
        } catch (ValidationException $e) {
            return $rolePermissions;
        }
    }


    public function addPermissionToRole($roleId, $clientId, $groupedData)
    {
        if ($clientId != 0) {
            $data = json_decode($groupedData, true);

            $ids  = array_map(function ($item) {
                return $item['module']['id'];
            }, $data);
            $requestResponse = ClientService::syncPermissionsToClient($ids);
            $requestResponse = ClientService::syncModulesToClient($clientId, $ids);
            if ($requestResponse) {
                return response()->json([
                    'status' => '1',
                    'message' => 'Permission for the client and role was successfully granted...',
                    'data' => [],
                ]);
            } else {
                return response()->json([
                    'status' => '0',
                    'message' => $requestResponse['message'],
                    'data' => [],
                ]);
            }
        }
        else{
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
}
