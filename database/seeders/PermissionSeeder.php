<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $superAdminID = 1;
            
            $permissions = [
                "admin.create",
                "admin.view",
                "admin.edit",
                "admin.delete",
                "modules.create",
                "modules.view",
                "modules.edit",
                "modules.delete",
                "roles.create",
                "roles.view",
                "roles.edit",
                "roles.delete",
                "privileges.create",
                "privileges.view",
                "privileges.edit",
                "privileges.delete",
                "permissions.create",
                "permissions.view",
                "permissions.edit",
                "permissions.delete",
                "users.create",
                "users.view",
                "users.edit",
                "users.delete",
                "clients.create",
                "clients.view",
                "clients.edit",
                "clients.delete",
                "categories.create",
                "categories.view",
                "categories.edit",
                "categories.delete"
            ];
            $role       = Role::findOrFail($superAdminID);

            foreach ($permissions as $permission) {
                $permission     = Permission::firstOrCreate(['name' => $permission]);
            }

            $role->syncPermissions($permissions);
            echo "Permission Created Successfully...";
        } 
        catch (ValidationException $e) {
            echo "Permission Created Failed...";
        }
         //php artisan db:seed --class=PermissionSeeder
    }
}
