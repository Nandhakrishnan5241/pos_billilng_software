@extends('layouts.admin')

@section('title', 'Manage Module')
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

@vite(['resources/js/module.js'])
@section('content')

    <div class="mt-4 h4">Manage Modules
        <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Module</button>
    </div>
    <hr>

    <div class="table-responsive">
        <table id="modulesTable" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be populated by DataTables -->
            </tbody>
        </table>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Create Module</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="moduleForm" action="{{ route('module.save') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label for="name">Module Name</label>
                    <input class="form-control" name="name" type="text" placeholder="Enter the module name"
                        id="name" />

                </div>
                {{-- <div class="mb-3">
                    <label for="name">Module Order</label>
                    <input class="form-control" name="order" type="number" placeholder="Enter the module order"
                        id="order" />

                </div> --}}
                {{-- <div class="mb-3">
                    <label for="">Select a status</label>
                    <select name="status" id="status" class="form-select  form-control">
                        <option value="">Select a Status</option>
                        <option value="0">Disable</option>
                        <option value="1">Enable</option>
                    </select>
                </div> --}}
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
            <form id="editModuleForm" action="{{ route('module.update') }}" method="POST">
                @csrf
                <input type="hidden" name="id" id="id">
                <div class="mb-3">
                    <label for="name">Module Name</label>
                    <input class="form-control" name="editName" type="text" placeholder="Enter the module name"
                        id="editName" />

                </div>
                <div class="mb-3">
                    <label for="name">Module Order</label>
                    <input class="form-control" name="editOrder" type="number" placeholder="Enter the module order"
                        id="editOrder" />

                </div>
                <div class="mb-3">
                    <label for="">Select a status</label>
                    <select name="editStatus" id="editStatus" class="form-select  form-control">
                        <option value="">Select a Status</option>
                        <option value="0">Disable</option>
                        <option value="1">Enable</option>
                    </select>
                </div>
                <div class="mt-4 mb-0">
                    <button class="btn btn-primary float-end" type="submit">Update</button>                 
                </div>        
            </form>

        </div>
    </div>

@endsection
