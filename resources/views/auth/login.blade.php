<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />
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

    <form method="POST" action="{{ route('login') }}" id="loginForm">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" autofocus
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password"
                autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            <x-primary-button class="ms-3" type="submit">
                {{ __('Log in') }}
            </x-primary-button>
        </div>
    </form>
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
</x-guest-layout>
