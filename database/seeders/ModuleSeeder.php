<?php

namespace Database\Seeders;

use App\Modules\Module\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Module::firstOrCreate([
            'name' => 'Admin',
            'slug' => 'admin',
            'icon' => 'fa-solid fa-user-secret',
            'url'  => 'admin',
            'tab'  => 'administration',
            'order' => 1
        ]);
        Module::firstOrCreate([
            'name' => 'Modules',
            'slug' => 'modules',
            'icon' => 'fa-solid fa-bars',
            'url'  => 'module',
            'tab'  => 'administration',
            'order' => 2
        ]);
        Module::firstOrCreate([
            'name' => 'Roles',
            'slug' => 'roles',
            'icon' => 'fa-solid fa-user-gear',
            'url'  => 'roles',
            'tab'  => 'administration',
            'order' => 3
        ]);
        Module::firstOrCreate([
            'name' => 'Permissions',
            'slug' => 'permissions',
            'icon' => 'fa-solid fa-shield-halved',
            'url'  => 'permissions',
            'tab'  => 'administration',
            'order' => 4
        ]);
        Module::firstOrCreate([
            'name' => 'Privileges',
            'slug' => 'privileges',
            'icon' => 'fa-solid fa-user-shield',
            'url'  => 'privileges',
            'tab'  => 'administration',
            'order' => 5
        ]);
        
        Module::firstOrCreate([
            'name' => 'Users',
            'slug' => 'users',
            'icon' => 'fa-solid fa-users',
            'url'  => 'users',
            'tab'  => 'administration',
            'order' => 6,
        ]);
        Module::firstOrCreate([
            'name' => 'Clients',
            'slug' => 'clients',
            'icon' => 'fa-solid fa-users-rectangle',
            'url'  => 'clients',
            'tab'  => 'administration',
            'order' => 7,
        ]);
        Module::firstOrCreate([
            'name' => 'categories',
            'slug' => 'categories',
            'icon' => 'fa-solid fa-cart-shopping',
            'url'  => 'category',
            'tab'  => 'outer',
            'order' => 8
        ]);

        echo "data inserted successfully...";
    }
    // php artisan db:seed --class=ModuleSeeder
}
