@extends('layouts.admin')

@section('title', 'Manage Clients')
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

    .image-preview {
        max-width: 300px;
        max-height: 300px;
        margin-top: 20px;
    }

    .image-container {
        display: none;
    }
</style>

{{-- SWEET ALERT --}}
<link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.css') }}">
<script src="{{ asset('plugins/sweetalert2/sweetalert2.js') }}"></script>

@vite(['resources/js/clients.js'])

@section('content')

    <div class="mt-4 h4">Manage Clients
        @if (auth()->user()->can('clients.create') || auth()->user()->hasRole('superadmin'))
            <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Client</button>
        @endif
    </div>
    <hr>

    {{-- <div class="table-responsive"> --}}
    <table id="clientsTable" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Company Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Company Logo</th>
                <th>Actions</th>
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
            <form id="addClientForm" action="{{ route('clients.save') }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-6 mb-3">
                        <label for="name">Company Name</label>
                        <input class="form-control" name="name" type="text"
                            placeholder="Enter the company name"id="name" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="email">Company Email</label>
                        <input class="form-control" name="email" type="email" placeholder="Enter the email"
                            id="email" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="mobile">Company Mobile</label>
                        <input class="form-control" name="mobile" type="number" placeholder="Enter the mobile"
                            id="mobile" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="address">Company Address</label>
                        <input class="form-control" name="address" type="text" placeholder="Enter the address"
                            id="address" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="logo">Company Logo</label>
                        <input class="form-control" name="logo" type="file" id="logo" />
                        <!-- Image Preview -->
                        <div class="image-container">
                            <img id="imagePreview" class="image-preview" src="{{ asset('') }}" alt="Image Preview">
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="subscribe" id="subscribe">
                            <label class="form-check-label" for="subscribe">Subscribe</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="superadmin" id="superadmin">
                            <label class="form-check-label" for="superadmin">Super Admin</label>
                        </div>
                    </div>
                    <div class="mt-4 mb-0">
                        <button class="btn btn-primary float-end" type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    {{-- EDIT OFFCANVAS --}}
    <div class="offcanvas offcanvas-end" tabindex="-1" id="editOffCanvasRight" aria-labelledby="editOffcanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="editOffcanvasRightLabel">Update Client</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="editClientForm" action="{{ route('clients.update') }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-6 mb-3">
                        <input type="hidden" id="id" name="id">
                        <input class="form-control" name="currentImage" id="currentImage" type="hidden" placeholder="" />
                        <label for="editName">Company Name</label>
                        <input class="form-control" name="editName" type="text"
                            placeholder="Enter the company name"id="editName" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="editEmail">Company Email</label>
                        <input class="form-control" name="editEmail" type="email" placeholder="Enter the email"
                            id="editEmail" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="editMobile">Company Mobile</label>
                        <input class="form-control" name="editMobile" type="number" placeholder="Enter the mobile"
                            id="editMobile" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="editAddress">Company Address</label>
                        <input class="form-control" name="editAddress" type="text" placeholder="Enter the address"
                            id="editAddress" />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="editLogo">Company Logo</label>
                        <input class="form-control" name="editLogo" type="file" id="editLogo" />

                        <!-- Image Preview -->
                        <div class="image-container">
                            <img id="editImagePreview" class="image-preview" src="{{ asset('') }}"
                                alt="Image Preview">
                        </div>
                    </div>
                    <div class="col-6 mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="editSubscribe" id="editSubscribe">
                            <label class="form-check-label" for="editSubscribe">Subscribe</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="editSuperadmin" id="editSuperadmin">
                            <label class="form-check-label" for="editSuperadmin">Super Admin</label>
                        </div>
                    </div>
                    <div class="mt-4 mb-0">
                        <button class="btn btn-primary float-end" type="submit">Save</button>
                    </div>
                </div>
            </form>

        </div>
    </div>

@endsection
