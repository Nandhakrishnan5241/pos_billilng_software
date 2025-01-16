@extends('layouts.admin')

@section('title', 'Manage Module')

@vite(['resources/js/module.js'])
@section('content')

    <div class="mt-4 h4">Manage Modules
        @if (auth()->user()->can('modules.create') || (auth()->user()->hasRole('superadmin')))
            <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Module</button>
        @endif
    </div>
    <hr>

    {{-- <div class="table-responsive"> --}}
        <table id="modulesTable" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Order</th>
                    {{-- <th>Status</th> --}}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Data will be populated by DataTables -->
            </tbody>
        </table>
    {{-- </div> --}}

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
               
                <div class="mt-4 mb-0">
                    <button class="btn btn-primary float-end" type="submit">Update</button>                 
                </div>        
            </form>

        </div>
    </div>

@endsection
