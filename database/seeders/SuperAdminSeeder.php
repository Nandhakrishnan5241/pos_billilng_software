<?php

namespace Database\Seeders;


use App\Models\User;
use App\Modules\Clients\Models\Client;
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
                'company_name'  => 'Super Admin',
                'company_logo'  => '../../images/clients/1733835693.png',
                'email'         => 'superadmin@gmail.com',
                'phone'         => '9988774455',
                'full_phone'    => '+919988774455',
                'country_code'  => '91',
                'is_superadmin' => 1,
                'is_subscribed' => 1,
                'address'       => 'omr main road',
                'city'          => 'chennai',
                'pincode'       => '665544',
                'state'         => 'Tamilnadu',
                'country'       => 'India',
                'timezone_id'   => 1
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
                'full_phone'    => '+919988774455',
                'country_code'  => '91',
                'primary_admin' => 1,
            ]);
            $this->command->info('Superadmin created successfully.');
            $superAdminRole   = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
            $user->assignRole([$superAdminRole->id]);
        }
        else{
            echo "user alreaady exists...";
        }
        // php artisan db:seed --class=SuperAdminSeeder
    
    }
}
