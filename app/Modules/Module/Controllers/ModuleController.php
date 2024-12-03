<?php

namespace App\Modules\Module\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Module\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ModuleController extends Controller
{
    public static $tableName = 'modules';

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
                'name'   => ['required','unique:'. Module::class],
                // 'order'  => 'required',
                // 'status' => 'required',
            ]);

            $name    = $request->input('name');
            $slug    = strtolower(str_replace(' ', '', $name));

            // $columns = Schema::getColumnListing(ModuleController::$tableName);
            //  $columnCount = count($columns);

            $lastRecord             = Module::latest('id')->first();
            if(!empty($lastRecord)){
                $lastRecordOrderCount   = $lastRecord->order;
            }
            else{
                $lastRecordOrderCount = 0;
            }
            $order   = ($request->input('order')?? ++$lastRecordOrderCount);
            $status  = ($request->input('status') ?? '1');

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
            $errors      = $e->validator->errors();
            $allMessages = $errors->all();
            return response()->json([
                'status' => '0',
                'message' => $allMessages[0],
                'data' => [],
            ]);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'editName' => [
                    'required',
                    Rule::unique('modules', 'name')->ignore($request->input('id')),
                ],
            ]);
            $id      = $request->input('id');
            $name    = $request->input('editName');
            $slug    = strtolower(str_replace(' ', '', $name));
            // $order   = $request->input('editOrder');
            // $status  = $request->input('editStatus');

            $module          = Module::find($id);

            $module->name    = $name;
            $module->slug    = $slug;
            // $module->order   = $order;
            // $module->status  = $status;
            $module->save();

            return response()->json([
                'status' => '1',
                'message' => 'Data Updated Successfully...',
                'data' => [],
            ]);
        } catch (ValidationException $e) {
            $errors      = $e->validator->errors();
            $allMessages = $errors->all();
            return response()->json([
                'status' => '0',
                'message' => $allMessages[0],
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
            $editAction   = '';
            $deleteAction = '';            
            if (Auth::user()->can('modules.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="editData(' . $module->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('modules.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="deleteData(' . $module->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            // $editAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="editData(' . $module->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';

            // $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="deleteData(' . $module->id . ')"><i class="fa-solid fa-trash"></i></a>';


            return [
                'id' => $module->id,
                'name' => $module->name,
                'slug' => $module->slug,
                'order' => $module->order,
                'status' => $module->status,
                'action' => $editAction . $deleteAction,
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
