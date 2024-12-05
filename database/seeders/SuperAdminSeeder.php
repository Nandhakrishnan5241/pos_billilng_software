<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client= Client::where('is_superadmin',1)->first();
        if(empty($client)){
            $client = Client::create([
                'company_name' => 'Super Admin',
                'company_logo' => 'company_logo',
                'email'        => 'superadmin@gmail.com',
                'mobile'       => '9988774455',
                'is_superadmin'=> 1,
                'is_subscribed'=> 1,
                'primary_address'=> 'chennai',
                'timezone_id' => time()
            ]);
            $this->command->info('Superadmin client created successfully.');
        }
        else{
            $this->command->info('Superadmin client already exists.');
        }

        $user         = User::where('email', 'superadmin@gmail.com')->first();
        $password     =  '12345678';
        $hashPassword = Hash::make($password);
        if (empty($user)) {
            $user = User::create([
                'client_id'     => $client->id,
                'name'          => 'superadmin', 
                'email'         => 'superadmin@gmail.com',
                'display_name'  =>'Super Admin',
                'password'      => $hashPassword, 
                'phone'         => '9988774455',
                'primary_admin' => 1,
            ]);
            $this->command->info('Superadmin created successfully.');
            $superAdminRole   = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
            $user->assignRole([$superAdminRole->id]);
        }
        else{
            echo "user alreaady exists...";
        }
        // php artisan db:seed --class=SuperAdminSeeder
    
    }
}
