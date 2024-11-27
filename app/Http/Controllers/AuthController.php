<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function changePassword(Request $request)
    {
        $user        = Auth::user();
        $password    = $request->password;
        $newpassword = $request->newpassword;



        $request->validate([
            'password' => 'required',
            'newpassword' => 'required|min:8',
        ]);
        if (Hash::check($password, $user->password)) {
            $user = User::find($user->id);

            $user->password = $newpassword;
            $user->save();

            return response()->json([
                'status' => 1,
                'msg' => 'Password Updated Successfully...',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => 0,
            'msg' => 'Password Updated Failed...',
            'data' => []
        ]);
    }
}
