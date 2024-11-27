<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ModuleController extends Controller
{
    public function index()
    {
        return view('module.index');
    }

    

    public function add()
    {
        return view('module.add');
    }

    public function edit($id='')
    {
        if(!empty($id)){
            $module = Module::findOrFail($id);
            return response()->json($module);
        }
    }

    public function delete($id) {
        

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
        dd($request);
        dd('test');
        try {
            $request->validate([
                'name' => 'required',
                'description' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            
            $name          = $request->input('name');
            $description   = $request->input('description');


            $module                = new Module();
            $module->name          = $name;
            $module->description   = $description;
            $module->image         = $fullPath;
            $module->save();

            return response()->json([
                'success' => 'Data Saved Successfully...',
                'imageUrl' => $fullPath, 
            ]);

        } catch (ValidationException $e) {
            return back()->with('failed', "Image Uploaded failed...");
        }       
    }

    public function update(Request $request) {
        try {
            $id            = $request->input('id');
            $name          = $request->input('name');
            $description   = $request->input('description');
            $image         = $request->input('image');

            $request->validate([
                'id'          => 'required',
                'name'        => 'required',
                'description' => 'required',
            ]);

            if(gettype($image) != 'string'){
                $request->validate([
                    'image'       => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ]);
                $imageName = time() . '.' . $request->image->extension();
                $imagePath = 'images/category/';
                $fullPath  = $imagePath . $imageName;

                $request->image->move(public_path($imagePath), $imageName);
                $fullPath      = '../../'.$fullPath;
            }
            else{
                $fullPath = $image;
            }

            $category        = Module::find($id);
            $category->name  = $name;
            $category->description   = $description;
            $category->image = $fullPath;
            $category->save();
            return response()->json([
                'success' => 'Data Updated Successfully...',
                'imageUrl' => $fullPath, 
            ]);
            
        } catch (ValidationException $e) {
            return back()->with('failed', "Image Uploaded failed...");
        }  
    }
}
