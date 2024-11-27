<?php

namespace App\Modules\Module\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Module\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ModuleController extends Controller
{
    public function index()
    {
        return view('module::index');
    }

    public function edit($id = '')
    {
        if (!empty($id)) {
            $module = Module::findOrFail($id);
            return response()->json($module);
        }
    }

    public function delete($id)
    {
        try {
            $module = Module::findOrFail($id);
            $module->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json([
            'success' => 'Data Deleted Successfully...'
        ]);
    }

    public function save(Request $request)
    {
        try {
            $request->validate([
                'name'   => 'required',
                'order'  => 'required',
                'status' => 'required',
            ]);

            $name    = $request->input('name');
            $slug    = strtolower(str_replace(' ', '', $name));
            $order   = $request->input('order');
            $status  = $request->input('status');


            $module          = new Module();
            $module->name    = $name;
            $module->slug    = $slug;
            $module->order   = $order;
            $module->status  = $status;
            $module->save();

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

    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName'   => 'required',
                'editOrder' => 'required',
                'editStatus' => 'required',
            ]);

            $id      = $request->input('id');
            $name    = $request->input('editName');
            $slug    = strtolower(str_replace(' ', '', $name));
            $order   = $request->input('editOrder');
            $status  = $request->input('editStatus');

            $module          = Module::find($id);

            $module->name    = $name;
            $module->slug    = $slug;
            $module->order   = $order;
            $module->status  = $status;
            $module->save();

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

    public function getDetails(Request $request){

        $columns = ['id', 'name', 'slug', 'order', 'order']; 
        $limit = $request->input('length', 10); 
        $start = $request->input('start', 0); 
        $search = $request->input('search')['value']; 

        $query = Module::query();
       
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('slug', 'like', '%' . $search . '%');
            });
        }

        $orderColumnIndex = $request->input('order.0.column'); 
        $orderDirection = $request->input('order.0.dir'); 

        if ($orderColumnIndex !== null) {
            $orderColumn = $columns[$orderColumnIndex];
            $query->orderBy($orderColumn, $orderDirection);
        }


        $modules = $query->skip($start)->take($limit)->get();

    
        $data = $modules->map(function ($module) {
            return [
                'id' => $module->id,
                'name' => $module->name,
                'slug' => $module->slug,
                'order' => $module->order,
                'status' => $module->status,
                'action' => '
                    <a href="#" class="btn  text-dark" data-id="' . $module->id . '" onclick="editData(' . $module->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>  
                    <a href="#" class="btn  text-dark" data-id="' . $module->id . '" onclick="deleteData(' . $module->id . ')"><i class="fa-solid fa-trash"></i></a>
                ',
            ];
        });

        $totalRecords = Module::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'), 
            'recordsTotal' => $totalRecords, 
            'recordsFiltered' => $filteredRecords, 
            'data' => $data,
        ]);
    }
}
