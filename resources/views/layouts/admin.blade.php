<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <script src="{{ asset('plugins/fontawesome/font.min.js') }}"></script>
 
    <script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('plugins/jqueryvalidation/jquery.validate.min.js') }}"></script>

    {{-- SWEET ALERT --}}
    <link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.css') }}">
    <script src="{{ asset('plugins/sweetalert2/sweetalert2.js') }}"></script>

    
    <link rel="stylesheet" href="{{ asset('plugins/datatables/dataTables.bootstrap5.min.css') }}">
    <script src="{{ asset('plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('plugins/datatables/dataTables.bootstrap5.min.js') }}"></script>

   

    @vite([
        'resources/css/styles.css',
        'resources/css/cards.css',
        'resources/js/app.js',
        'resources/js/script.js',
        'resources/js/changepassword.js',
        'resources/js/datatables-simple-demo.js',
    ])
</head>

<body class="sb-nav-fixed">

    @include('layouts.partials.navbar')

    <div id="layoutSidenav">

        <div id="layoutSidenav_nav">
            @include('layouts.partials.sidebar')
        </div>


        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    @yield('content')
                </div>
            </main>
            @include('layouts.partials.footer')
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous">
    </script>



</body>

</html>
