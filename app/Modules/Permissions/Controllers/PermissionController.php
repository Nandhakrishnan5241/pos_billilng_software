<?php

namespace App\Modules\Permissions\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::get();
        return view('permissions::index', compact("permissions"));
    }
    
    public function save(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'string',
                'unique:permissions,name,except,id'
            ]);

            Permission::create([
                'name' => $request->name
            ]);

            return response()->json([
                'status' => '1',
                'message' => 'Data Saved Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Data Saved Failed...',
                'data' => [],
            ]);
        }
    }
    public function edit($id = '')
    {
        if (!empty($id)) {
            $data = Permission::findOrFail($id);
            return response()->json($data);
        }
    }
    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName'   => 'required',
            ]);

            $id      = $request->input('id');
            $name    = $request->input('editName');

            $permission          = Permission::find($id);
            $permission->name    = $name;
            $permission->save();

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
    
    public function delete($id)
    {
        try {
            $module = Permission::findOrFail($id);
            $module->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getDetails(Request $request){
        $columns = ['id', 'name']; 
        $limit   = $request->input('length', 10); 
        $start   = $request->input('start', 0); 
        $search  = $request->input('search')['value']; 

        $query = Permission::query();
       
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        $orderColumnIndex = $request->input('order.0.column'); 
        $orderDirection = $request->input('order.0.dir'); 

        if ($orderColumnIndex !== null) {
            $orderColumn = $columns[$orderColumnIndex];
            $query->orderBy($orderColumn, $orderDirection);
        }

        $datas = $query->skip($start)->take($limit)->get();

        $data = $datas->map(function ($data) {
            $editAction    = '';
            $deleteAction  = '';
            if (Auth::user()->can('permissions.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('permissions.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            return [
                'id' => $data->id,
                'name' => $data->name,
                'action' => $editAction . $deleteAction,
            ];
        });

        $totalRecords = Permission::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'), 
            'recordsTotal' => $totalRecords, 
            'recordsFiltered' => $filteredRecords, 
            'data' => $data,
        ]);
    }
}
