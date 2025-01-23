@extends('layouts.app') {{-- If using layouts, adjust as needed --}}

@section('title', '404 - Page Not Found')

@section('content')
<div style="text-align: center; padding: 50px;">
    <h1 style="font-size: 100px; color: #ff6b6b;">404</h1>
    <h2 style="color: #555;">Oops! Page Not Found</h2>
    <p style="color: #888;">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>

    <a href="{{ url('/') }}" 
        style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Go to Homepage
    </a>
</div>
@endsection
