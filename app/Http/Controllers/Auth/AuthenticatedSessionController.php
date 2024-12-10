<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Modules\Clients\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        // return view('auth.login');
        return view('admin.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();


        $request->session()->regenerate();


        $user   = $request->user();
        $client = Client::find($user->client_id);
        // dd($client->is_subscribed);

     
        if ($client->is_subscribed === 1) {
            // User is subscribed, grant access
            return redirect()->intended(route('bsadmin.dashboard', ['absolute' => false]));
        } else {
            Auth::logout();
            return back()->withErrors([
                'email' => 'You do not have access. Please subscribe to get access.',
            ]);
            // User is not subscribed, deny access and redirect back

            $request->session()->flash('error', 'You do not have access. Please subscribe to get access.');
            return redirect()->back();
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('bsadmin/login');
        // return redirect('/login');
    }
}
