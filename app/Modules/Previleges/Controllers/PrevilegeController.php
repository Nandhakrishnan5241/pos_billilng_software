<?php

namespace App\Modules\Previleges\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Module\Models\Module;
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
        $roles   = Role::get();
        $modules = Module::get();
        // $permissions = Permission::get();
        return view('previleges::index', compact("roles","modules"));
        // return view('previleges::index', compact("roles","modules","permissions"));
    }
    public function addPermissionToRole($roleId,$groupedData)
    {
        $user = Auth::user();
        try {
            $decodeData = json_decode($groupedData,true);
            $role       = Role::findOrFail($roleId);
            
            $permissions = [];
            foreach ($decodeData as $data) {
                $moduleSlug = $data['module']['slug'];
                $actions = $data['actions'];

                
                foreach ($actions as $action) {
                    $permissionName = "{$moduleSlug}.{$action}";
                    $permission     = Permission::firstOrCreate(['name' => $permissionName]);
                    $permissions[]  = $permissionName;    
                    // $role->givePermissionTo($permissions);   
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

    public function givePermissionToRole(Request $request, $roleId)
    {
        dd('test');
        try {
            $request->validate([
                'permissions' => 'required'
            ]);
            dd($request);
            $role = Role::findOrFail($roleId);
            $role->syncPermissions($request->permissions);

            return response()->json([
                'status' => '1',
                'message' => 'Data Updated Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Data Updated Failed...',
                'data' => [],
            ]);
        }
    }
}
