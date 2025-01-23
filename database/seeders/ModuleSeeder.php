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
            'icon' => '<i class="fa-solid fa-list"></i>',
            'url'  => 'admin',
            'tab'  => 'administration',
            'order' => 1
        ]);
        Module::firstOrCreate([
            'name' => 'Modules',
            'slug' => 'modules',
            'icon' => '<i class="fa-solid fa-user-secret"></i>',
            'url'  => 'modules',
            'tab'  => 'administration',
            'order' => 2
        ]);
        Module::firstOrCreate([
            'name' => 'Roles',
            'slug' => 'roles',
            'icon' => '<i class="fa-solid fa-user-secret"></i>',
            'url'  => 'roles',
            'tab'  => 'administration',
            'order' => 3
        ]);
        Module::firstOrCreate([
            'name' => 'Permissions',
            'slug' => 'permissions',
            'icon' => '<i class="fa-solid fa-gear">',
            'url'  => 'permissions',
            'tab'  => 'administration',
            'order' => 4
        ]);
        Module::firstOrCreate([
            'name' => 'Privileges',
            'slug' => 'privileges',
            'icon' => '<i class="fa-regular fa-circle-user"></i>',
            'url'  => 'privileges',
            'tab'  => 'administration',
            'order' => 5
        ]);
        
        Module::firstOrCreate([
            'name' => 'Users',
            'slug' => 'users',
            'icon' => '<i class="fa-solid fa-user"></i>',
            'url'  => 'modules',
            'tab'  => 'administration',
            'order' => 6,
        ]);
        Module::firstOrCreate([
            'name' => 'Clients',
            'slug' => 'clients',
            'icon' => '<i class="fa-solid fa-user"></i>',
            'url'  => 'clients',
            'tab'  => 'administration',
            'order' => 7,
        ]);
        Module::firstOrCreate([
            'name' => 'Categories',
            'slug' => 'categories',
            'icon' => '<i class="fa-solid fa-user-secret"></i>',
            'url'  => 'categories',
            'tab'  => 'outer',
            'order' => 8
        ]);

        echo "data inserted successfully...";
    }
    // php artisan db:seed --class=ModuleSeeder
}
