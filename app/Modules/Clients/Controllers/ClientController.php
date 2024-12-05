<?php

namespace App\Modules\Clients\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Clients\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    public function index()
    {
        return view('clients::index');
    }

    public function edit($id='')
    {
        if(!empty($id)){
            $client = Client::findOrFail($id);
            return response()->json($client);
        }
    }

    public function delete($id)
    {
        try {
            $module = Client::findOrFail($id);
            $module->delete();
            return response()->json(['status' => 200, 'success' => 'Data Deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function save(Request $request)
    {
        try {
            $request->validate([
               'name' => ['required', 'string', 'max:255'],
               'email' => ['required', 'lowercase', 'email', 'max:255', 'unique:' . Client::class],
               'mobile' => 'required',
               'address' => 'required',
               'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $imageName = time() . '.' . $request->logo->extension();
            $imagePath = 'images/clients/';
            $fullPath  = $imagePath . $imageName;
            $request->logo->move(public_path($imagePath), $imageName);

            $name        = $request->input('name');
            $email       = $request->input('email');
            $mobile      = $request->input('mobile');
            $address     = $request->input('address');
            $superadmin  = $request->input('superadmin');
            $subscribe   = $request->input('subscribe');
            $fullPath    = '../../'.$fullPath;

            $client                    = new Client();

            $client->company_name      = $name;
            $client->company_logo      = $fullPath;
            $client->email             = $email;
            $client->mobile            = $mobile;
            $client->is_superadmin     = $superadmin;
            $client->is_subscribed     = $subscribe;
            $client->primary_address   = $address;
            $client->timezone_id       = time();

            $client->save();

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
               'editName' => ['required', 'string', 'max:255'],
               'email' => Rule::unique('clients', 'email')->ignore($request->input('id')),
               'editMobile' => 'required',
               'editAddress' => 'required',
            ]);
          

            $id          = $request->input('id');
            $name        = $request->input('editName');
            $email       = $request->input('editEmail');
            $mobile      = $request->input('editMobile');
            $address     = $request->input('editAddress');
            $superadmin  = $request->input('superadmin');
            $subscribe    = $request->input('subscribe');
            $currentImage = $request->input('currentImage');

            // dd($request,$logo);

            if(!empty($request->editLogo)){
                $imageName = time() . '.' . $request->editLogo->extension();
                $imagePath = 'images/clients/';
                $fullPath  = $imagePath . $imageName;
                $request->editLogo->move(public_path($imagePath), $imageName);
                $fullPath    = '../../'.$fullPath;
            }
            else{
                $fullPath    = $currentImage;
            }

            $client                    = Client::find($id);

            $client->company_name      = $name;
            $client->company_logo      = $fullPath;
            $client->email             = $email;
            $client->mobile            = $mobile;
            $client->is_superadmin     = $superadmin;
            $client->is_subscribed     = $subscribe;
            $client->primary_address   = $address;
            $client->timezone_id       = time();

            $client->save();

            return response()->json([
                'status' => '1',
                'message' => 'Data updated Successfully...',
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


    public function getDetails(Request $request)
    {
        $columns = ['id', 'company_name','email','mobile','company_logo'];
        $limit   = $request->input('length', 10);
        $start   = $request->input('start', 0);
        $search  = $request->input('search')['value'];

        $query = Client::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('company_name', 'like', '%' . $search . '%');
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
            if (Auth::user()->can('clients.edit') || Auth::user()->hasRole('superadmin')) {
                $editAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="editData(' . $data->id . ')"><i class="fa-solid fa-pen-to-square"></i></a>';
            }
            if (Auth::user()->can('clients.delete') || Auth::user()->hasRole('superadmin')) {
                $deleteAction = '<a href="#" class="btn text-dark" data-id="' . $data->id . '" onclick="deleteData(' . $data->id . ')"><i class="fa-solid fa-trash"></i></a>';
            }
            return [
                'id' => $data->id,
                'company_name' => $data->company_name,
                'email' => $data->email,
                'mobile' => $data->mobile,
                'company_logo' => '<img src="' . Storage::url($data->company_logo) . '" width="100" >',
                // 'company_logo' => $data->company_logo,
                'action' => $editAction . $deleteAction,
            ];
        });

        $totalRecords = Client::count();
        $filteredRecords = $query->count();

        return response()->json([
            'draw' => $request->input('draw'),
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $filteredRecords,
            'data' => $data,
        ]);
    }
}
