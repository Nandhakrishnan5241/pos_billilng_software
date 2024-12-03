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
@vite(['resources/js/previleges.js'])

@section('content')

    <div class="mt-4 h4">Manage Roles
        @if (auth()->user()->can('roles.create') || (auth()->user()->hasRole('superadmin')))
            <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Roles</button>
        @endif
    </div>
    <hr>

    {{-- <div class="table-responsive"> --}}
        <table id="rolesTable" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be populated by DataTables -->
            </tbody>
        </table>
    {{-- </div> --}}
    {{-- ADD --}}

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Create Role</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="rolesForm" action="{{ route('roles.save') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label for="name">Role Name</label>
                    <input class="form-control" name="name" type="text" placeholder="Enter the permission name" id="name" />
                </div>
                <div class="mt-4 mb-0">
                    <button class="btn btn-primary float-end" type="submit">Save</button>                 
                </div>        
            </form>

        </div>
    </div>

    {{-- EDIT OFFCANVAS --}}
    <div class="offcanvas offcanvas-end" tabindex="-1" id="editOffCanvasRight" aria-labelledby="editOffcanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="editOffcanvasRightLabel">Update Role</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="editRolesForm" action="{{ route('roles.update') }}" method="POST">
                @csrf
                <input type="hidden" name="id" id="id">
                <div class="mb-3">
                    <label for="name">Role Name</label>
                    <input class="form-control" name="editName" type="text" placeholder="Enter the module name"
                        id="editName" />
                </div>
                <div class="mt-4 mb-0">
                    <button class="btn btn-primary float-end" type="submit">Update</button>                 
                </div>        
            </form>

        </div>
    </div>

@endsection
