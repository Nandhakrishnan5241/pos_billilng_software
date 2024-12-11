<!-- Session Status -->
<x-auth-session-status class="mb-4" :status="session('status')" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>

<style>
    .validation,
    .validation:focus {
        color: red !important;
        border-color: red !important;
    }

    .validation::placeholder {
        color: red !important;
        opacity: 1 !important;
    }
</style>

<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="max-width: 400px; width: 100%;">
        {{-- <h3 class="text-center mb-4">Login</h3> --}}
        <img src="{{ asset('../../images/default/login_logo.png') }}" alt="" class=" mx-4 "
            style="width: 80%; object-fit: cover;">
        {{-- <form method="POST" action="{{ route('login') }}" id="loginForm"> --}}
        <form method="POST" action="{{ route('bsadmin.login') }}" id="loginForm">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" value="{{ old('email') }}"
                    autofocus autocomplete="username">

            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" name="password" class="form-control"
                    autocomplete="current-password">
                @error('password')
                    <div class="text-danger mt-1">{{ $message }}</div>
                @enderror
            </div>


            <!-- Remember Me -->
            {{-- <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="remember_me" name="remember">
                <label class="form-check-label" for="remember_me">
                    Remember me
                </label>
            </div> --}}

            <!-- Forgot Password and Submit Button -->
            <div class="d-flex justify-content-between align-items-center">
                @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}" class="text-decoration-none small">
                        Forgot your password?
                    </a>
                @endif
                <button type="submit" class="btn btn-dark">Log In</button>
            </div>
            <div class="mt-2">
                @error('email')
                    {{-- <div class="text-danger mt-1">{{ $message }}</div> --}}
                    <div class="alert alert-danger">
                        {{ $message }}
                    </div>
                @enderror
            </div>
        </form>
    </div>
</div>

<script>
    $(document).ready(function() {
        var formValidator = {
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                },
            },
            messages: {
                email: {
                    required: "Please enter a valid email address",
                },
                password: {
                    required: "Password field is required",
                },
            },
            highlight: function(element) {
                $(element).addClass("validation");
                $(element).next("span").addClass("validation");
            },
            unhighlight: function(element) {
                $(element).removeClass("validation");
                $(element).next("span").removeClass("validation");
            },
            errorPlacement: function(error, element) {
                element.attr("placeholder", error.text()).addClass("validation");
                element.next("span").addClass("validation");
            },
            debug: false,
            submitHandler: function(form) {
                form.submit();
            },
        };

        $("#loginForm").validate(formValidator);


    });
</script>
