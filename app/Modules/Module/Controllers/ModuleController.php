<?php

namespace App\Modules\Module\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Module\Models\Module;
use App\Services\ClientService;
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
                'name'   => ['required', 'unique:' . Module::class],
            ]);

            $name      = $request->input('name');
            $dashboard = $request->input('dashboard');
            $active    = $request->input('active');
            $slug      = strtolower(str_replace(' ', '', $name));
            $icon      = $slug.'.png';
            $url       = $slug;
            $tab       = 'administration';

            $lastRecord             = Module::latest('id')->first();
            if (!empty($lastRecord)) {
                $lastRecordOrderCount   = $lastRecord->order;
            } else {
                $lastRecordOrderCount = 0;
            }
            $order   = ($request->input('order') ?? ++$lastRecordOrderCount);

            $moduleIds  = Module::pluck('id')->toArray();
           

            $module              = new Module();
            $module->name        = $name;
            $module->slug        = $slug;
            $module->icon        = $icon;
            $module->url         = $url;
            $module->tab         = $tab;
            $module->order       = $order;
            $module->dashboard   = $dashboard;
            $module->active      = $active;
            $module->save();
            
            array_push($moduleIds, $module->id);

            $requestResponse = ClientService::syncPermissionsToClient($moduleIds);
            $requestResponse = ClientService::syncModulesToClient(1, $moduleIds);
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
            $id        = $request->input('id');
            $name      = $request->input('editName');
            $slug      = strtolower(str_replace(' ', '', $name));
            $dashboard = $request->input('dashboard');
            $active    = $request->input('active');


            $module          = Module::find($id);

            $module->name    = $name;
            $module->slug    = $slug;
            $module->dashboard   = $dashboard;
            $module->active      = $active;
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

    public function getDetails(Request $request)
    {

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

        // $query->where('dashboard', 1)
        //     ->where('active', 1);

        $query->orderBy('order', 'asc');

        $orderColumnIndex = $request->input('order.0.column');
        $orderDirection = $request->input('order.0.dir');

        if ($orderColumnIndex !== null) {
            $orderColumn = $columns[$orderColumnIndex];
            $query->orderBy($orderColumn, $orderDirection);
        }


        $modules = $query->skip($start)->take($limit)->get();

        $data = $modules->map(function ($module, $index) use ($modules) {

            $editAction   = '';
            $deleteAction = '';
            if (Auth::user()->can('modules.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="editData(' . $module->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('modules.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $module->id . '" onclick="deleteData(' . $module->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }

            if ($index == 0) {
                $reorderButtons = '
                    <a href="#" class="btn text-dark" onclick="moveDown(' . $module->id . ')"><i class="fa-solid fa-arrow-down"></i></a>';
            } else if ($index == count($modules) - 1) {
                $reorderButtons = '
                    <a href="#" class="btn text-dark" onclick="moveUp(' . $module->id . ')"><i class="fa-solid fa-arrow-up"></i></a>';
            } else {
                $reorderButtons = '
                    <a href="#" class="btn text-dark" onclick="moveUp(' . $module->id . ')"><i class="fa-solid fa-arrow-up"></i></a>
                    <a href="#" class="btn text-dark" onclick="moveDown(' . $module->id . ')"><i class="fa-solid fa-arrow-down"></i></a>
                ';
            }
            $active    = ($module->active == 1 ? '<i class="fa-solid fa-check">‌</i>' : '<i class="fa-solid fa-circle-xmark"></i>');
            $dashboard = ($module->dashboard == 1 ? '<i class="fa-solid fa-check">‌</i>' : '<i class="fa-solid fa-circle-xmark"></i>');


            return [
                'id' => $module->id,
                'name' => $module->name,
                'order' => $reorderButtons,
                'active' => $active,
                'dashboard' => $dashboard,
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

    public function moveUp($moduleId)
    {
        try {
            $module   = Module::findOrFail($moduleId);
            $previous = Module::where('order', '<', $module->order)->orderBy('order', 'desc')->first();

            if ($previous) {
                $temp            = $module->order;
                $module->order   = $previous->order;
                $previous->order = $temp;

                $module->save();
                $previous->save();
            }
            return response()->json([
                'status' => 1,
                'message' => 'Data Order Changed Successfully.'
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

    public function moveDown($moduleId)
    {
        try {
            $module = Module::findOrFail($moduleId);
            $next = Module::where('order', '>', $module->order)->orderBy('order', 'asc')->first();

            if ($next) {
                $temp          = $module->order;
                $module->order = $next->order;
                $next->order   = $temp;

                $module->save();
                $next->save();
            }

            return response()->json([
                'status' => 1,
                'message' => 'Data Order Changed Successfully.'
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
}
