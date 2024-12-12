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
                'order' => 1,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Modules',
                'slug' => 'modules',
                'order' => 2,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Roles',
                'slug' => 'roles',
                'order' => 3,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Permissions',
                'slug' => 'permissions',
                'order' => 4,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Privileges',
                'slug' => 'privileges',
                'order' => 5,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Categories',
                'slug' => 'categories',
                'order' => 6,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Users',
                'slug' => 'users',
                'order' => 7,
                'status' => 1
            ]);
            Module::firstOrCreate([
                'name' => 'Clients',
                'slug' => 'clients',
                'order' => 8,
                'status' => 1
            ]);

            echo "data inserted successfully...";
        
    }
    // php artisan db:seed --class=ModuleSeeder
}
