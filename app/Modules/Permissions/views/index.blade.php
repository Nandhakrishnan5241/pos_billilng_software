@extends('layouts.admin')

@section('title', 'Manage Permissions')
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

@vite(['resources/js/permission.js'])

@section('content')

    <div class="mt-4 h4">Manage Permissions
        <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Permission</button>
    </div>
    <hr>

    <div class="table-responsive">
        <table id="permissionTable" class="table table-bordered table-striped">
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
    </div>
    {{-- ADD --}}

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Create Module</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="permissionForm" action="{{ route('permissions.save') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label for="name">Permission Name</label>
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
            <h5 id="editOffcanvasRightLabel">Update Module</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="editPermissionForm" action="{{ route('permissions.update') }}" method="POST">
                @csrf
                <input type="hidden" name="id" id="id">
                <div class="mb-3">
                    <label for="name">Permission Name</label>
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