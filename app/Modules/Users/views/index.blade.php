@extends('layouts.admin')

@section('title', 'Manage Users')
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

@vite(['resources/js/users.js'])

@section('content')

    <div class="mt-4 h4">Manage Users
        <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add User</button>
    </div>
    <hr>

    <div class="table-responsive">
        <table id="usersTable" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
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
            <h5 id="offcanvasRightLabel">Create User</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="addUserForm" action="{{ route('users.save') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input class="form-control" name="name" type="text" placeholder="Enter the name" id="name" />
                </div>
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input class="form-control" name="email" type="email" placeholder="Enter the name" id="email" />
                </div>
                <div class="mb-3">
                    <label for="userpassword">Password</label>
                    <input class="form-control" name="userpassword" type="text" placeholder="Enter the userpassword" id="userpassword" />
                </div>
                <div class="mb-3">
                    <label for="userconfirmpassword">Confirm Password</label>
                    <input class="form-control" name="userconfirmpassword" type="text" placeholder="Enter the userconfirmpassword" id="userconfirmpassword" />
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
            <form id="editUserForm" action="{{ route('users.update') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <input name="id" type="hidden" placeholder="" id="id" />
                    <label for="name">Name</label>
                    <input class="form-control" name="editName" type="text" placeholder="Enter the name" id="editName" />
                </div>
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input class="form-control" name="editEmail" type="email" placeholder="Enter the name" id="editEmail" />
                </div>
                <div class="mt-4 mb-0">
                    <button class="btn btn-primary float-end" type="submit">Save</button>                 
                </div>        
            </form>

        </div>
    </div>

@endsection