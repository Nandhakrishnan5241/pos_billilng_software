<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user         = User::where('email', 'superadmin@gmail.com')->first();
        $password     =  '12345678';
        $hashPassword = Hash::make($password);
        if (empty($user)) {
            $user = User::create([
                'name'      => 'superadmin',
                'email'     => 'superadmin@gmail.com',
                'password'  => $hashPassword,                   
            ]);
            $this->command->info('Superadmin created successfully.');
            $superAdminRole   = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
            $user->assignRole([$superAdminRole->id]);
        }
        else{
            echo "user alreaady exists...";
        }
        //php artisan db:seed --class=UserSeeder
    }
}
