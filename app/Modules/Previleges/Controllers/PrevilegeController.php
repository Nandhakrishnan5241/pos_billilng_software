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
        $roleId  = $roleIds[0];

        $permissions        = Permission::get();
        $roles              = Role::get();

        // $modules            = Module::get();
        $modules            = Module::where('dashboard', 1)->get();
        $clients            = Client::get();
        if (!auth()->user()->hasRole('superadmin')) {
            $roles              = $roles->slice(1);
            $clients            = $clients->slice(1);
        }

        $roleHasPermissions = PrevilegeController::getPermissionsByRoleId($roleId);

        return view('previleges::index', compact("roles", "modules", "permissions", "roleHasPermissions", 'clients'));
    }

    public static function getPermissionsByRoleId($roleId)
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
        $user = Auth::user();
        if ($clientId != 0) {
            $data = json_decode($groupedData, true);
            $moduleIds  = array_map(function ($item) {
                return $item['module']['id'];
            }, $data);
            $requestResponse = ClientService::syncEnabledPermissionsToClient($roleId, $clientId, $moduleIds, $data);
            // $requestResponse = ClientService::syncPermissionsToClient($ids);
            // $requestResponse = ClientService::syncModulesToClient($clientId, $ids);
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
        } else {
            try {
                $decodeData = json_decode($groupedData, true);
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
                $moduleIds  = array_map(function ($item) {
                    return $item['module']['id'];
                }, $decodeData);
                $requestResponse = ClientService::syncEnabledPermissionsToClient($roleId, $user->client_id, $moduleIds, $decodeData);
                // $requestResponse = ClientService::syncPermissionsToClient($moduleIds);
                // $requestResponse = ClientService::syncModulesToClient($user->client_id, $moduleIds);

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

    public static function getPermissionModulesForClient($modules)
    {
        $actions    = ['create', 'view', 'edit', 'delete'];
        $permissions = [];
        foreach ($modules as $module) {
            $moduleSlug = $module['slug'];

            foreach ($actions as $action) {
                $permissionName = "{$moduleSlug}.{$action}";
                $permission     = Permission::firstOrCreate(['name' => $permissionName]);
                $permissions[]  = $permissionName;
            }
        }
        return $permissions;
    }

    /**----------------get privileges by client id currently not use in this function-------------- */
    public static function getPrivilegesByClientID($clientId)
    {
        try {
            $modules   = Module::get();
            $moduleIds = DB::table('client_has_modules')
                ->where('client_id', $clientId)
                ->pluck('module_id');

            $clientHasModule = DB::table('modules')
                ->whereIn('id', $moduleIds)
                ->get()
                ->map(function ($module) {
                    return (array) $module;
                })
                ->toArray();


            $modulePermissions = PrevilegeController::getPermissionModulesForClient($clientHasModule);

            return response()->json([
                'status' => '1',
                'message' => 'data get by client ID...',
                'data' => ['permissions' => $modulePermissions, 'modules' => $modules]
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'data not found by client ID...',
                'data' => [],
            ]);
        }
    }
    /**----------------get privileges by roled id currently not use in this function-------------- */
    public static function getPrivilegesByRoleID($roleId)
    {
        try {
            $roleHasPermissions = PrevilegeController::getPermissionsByRoleId($roleId);
            $modules            = Module::get();
            return response()->json([
                'status' => '1',
                'message' => 'data get by role ID.',
                'data' => ['permissions' => $roleHasPermissions, 'modules' => $modules]
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'data not found by role ID...',
                'data' => [],
            ]);
        }
    }

    public function getPrivilegesByClientAndRoldID($roleId, $clientId)
    {
        try {

            if ($clientId == 0) {
                $user = Auth::user();
                $clientId = $user->client_id;
            }
            // PrevilegeController::getPrivilegesByRoleID($roleId);
            // PrevilegeController::getPrivilegesByClientID($clientId);
            if (auth()->user()->hasRole('superadmin')) {
                $modules = Module::get();
            } else {
                $modules   = Module::where('dashboard', 1)->get();
            }
            if ($clientId == 1 && $roleId == 1) {
                $clientHasModule    = PrevilegeController::getPermissionsByRoleId($roleId);
            } else {
                $clientHasModule    = PrevilegeController::getModulesByEnabledActions($roleId, $clientId);
            }

            return response()->json([
                'status' => '1',
                'message' => 'data get by role ID.',
                'data' => ['permissions' => $clientHasModule, 'modules' => $modules]
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'data not found by role ID...',
                'data' => [],
            ]);
        }
    }

    public static function getModulesByEnabledActions($roleId, $clientId)
    {
        $modulesWithPermissions = DB::table('client_has_modules')
            ->join('model_has_roles', 'model_has_roles.model_id', '=', 'client_has_modules.client_id')
            ->join('modules', 'modules.id', '=', 'client_has_modules.module_id')
            ->leftJoin('role_has_permissions', 'role_has_permissions.role_id', '=', 'model_has_roles.role_id')
            ->leftJoin('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
            ->where('model_has_roles.role_id', $roleId)
            ->where('client_has_modules.client_id', $clientId)
            ->select(
                'modules.id',
                'modules.name',
                'modules.slug',
                'modules.icon',
                'modules.url',
                'modules.tab',
                'modules.order',
                'modules.active',
                'modules.dashboard',
                'modules.created_at',
                'modules.updated_at',
                'modules.deleted_at',
                'permissions.name as permission'
            )
            ->get();

        $flattenedActions = [];

        foreach ($modulesWithPermissions as $moduleData) {
            if ($moduleData->permission) {
                $flattenedActions[] = $moduleData->permission;
            }
        }
        $flattenedActions = collect($flattenedActions)->unique()->sort()->values();

        return $flattenedActions;
    }
}
