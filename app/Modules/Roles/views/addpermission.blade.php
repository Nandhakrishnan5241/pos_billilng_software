@extends('layouts.admin')

@section('title', 'Manage Roles')
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

{{-- SWEET ALERT --}}
<link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.css') }}">
<script src="{{ asset('plugins/sweetalert2/sweetalert2.js') }}"></script>

@vite(['resources/js/roles.js'])


@section('content')

    {{-- <div class="mt-4 h4">Manage Roles
        <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Roles</button>
    </div>
    <hr> --}}

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                @if (session('status'))
                <div class="alert alert-success">{{session('status')}}</div>
                    
                @endif
                <div class="card-header">
                    <h4> Role : {{ $role->name }} <a href="{{ url('roles') }}"
                            class="btn btn-danger float-end">Back</a></h4>
                </div>
                <hr>
                <div class="card-body">
                    <form action="{{ url('roles/' . $role->id . '/givepermissions') }}" method="POST" id="roleHasPermissionForm">
                        @csrf
                        @method('PUT')
                        <div class="mb-3">
                            @error('permission')
                            <span class="text-danger">{{$message}}</span>                                
                            @enderror
                            <h6><label for="">Permissions</label></h6>
                            <div class="row">
                                @foreach ($permissions as $permission)
                                    <div class="col-md-2">
                                        <label>
                                            <input type="checkbox" id="permissions" name="permissions[]"
                                                value="{{ $permission->name }}"
                                                {{in_array($permission->id, $rolePermissions) ? 'checked' : ''}}
                                            >
                                            {{ $permission->name }}
                                                
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                        <div class="mb-3 float-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>


    

@endsection
