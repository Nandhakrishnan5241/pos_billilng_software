<?php

namespace App\Services;

use App\Modules\Clients\Models\Client;
use App\Modules\Module\Models\Module;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ClientService
{
    public static function syncPermissionsToClient($moduleIds)
    {
        try {
            $role       = Role::findByName('admin');
            $actions    = ['create', 'view', 'edit', 'delete'];
            $modules    = Module::whereIn('id', $moduleIds)->get();

            $permissions = [];
            foreach ($modules as $module) {
                $moduleSlug = $module['slug'];

                foreach ($actions as $action) {
                    $permissionName = "{$moduleSlug}.{$action}";
                    $permission     = Permission::firstOrCreate(['name' => $permissionName]);
                    $permissions[]  = $permissionName;
                }
            }
            $role->syncPermissions($permissions);
            return true;
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
    public static function syncModulesToClient($clientId, $moduleIds)
    {
        try {
            $client    = Client::find($clientId);
            $client->modules()->sync($moduleIds);
            return true;
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