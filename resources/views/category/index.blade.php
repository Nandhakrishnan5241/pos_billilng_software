@extends('layouts.admin')

@section('title', 'Manage Category')

{{-- <script src="{{ asset('plugins/jquery/jquery.js') }}"></script> --}}

{{-- DATA TABLE --}}
{{-- <link rel="stylesheet" href="{{ asset('plugins/datatables/dataTables.bootstrap5.min.css') }}">
<script src="{{ asset('plugins/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('plugins/datatables/dataTables.bootstrap5.min.js') }}"></script> --}}

{{-- <script src="{{ asset('plugins/jqueryvalidation/jquery.validate.min.js') }}"></script>
<script src="{{ asset('plugins/jqueryvalidation/additional-methods.min.js') }}"></script>  --}}

{{-- SWEET ALERT --}}
<link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.css') }}">
<script src="{{ asset('plugins/sweetalert2/sweetalert2.js') }}"></script>

<style>
    .image-preview {
        max-width: 300px;
        max-height: 300px;
        margin-top: 20px;
    }

    .image-container {
        display: none;
    }
</style>
@vite(['resources/js/category.js'])
@section('content')

    <div class="mt-4 h4">Manage Category
        @if (auth()->user()->can('categories.create'))
            <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Category</button>
        @endif
    </div>
    <hr>

    {{-- <div class="table-responsive"> --}}
    <table id="categories-table" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
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
            <h5 id="offcanvasRightLabel">Create Category</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="categoryForm" action="{{ route('category.save') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-floating mb-3">
                    <input class="form-control" name="name" type="text" placeholder="Enter the category name"
                        id="name" />
                    <label for="name">Category Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" name="description" type="text"
                        placeholder="Enter the category Description" id="description" />
                    <label for="description">Category Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="file" name="image" id="image" class="form-control">
                </div>

                <!-- Image Preview -->
                <div class="image-container">
                    <img id="imagePreview" class="image-preview" src="{{ asset('') }}" alt="Image Preview">
                </div>

                <div class="mt-4 mb-0">
                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                </div>

                <!-- Success Message -->
                @if (session('success'))
                    <div id="successMessage" style="color: green;">{{ session('success') }}</div>
                    <img src="{{ asset('images/' . session('image')) }}" alt="Uploaded Image" class="image-preview">
                @elseif (session('failed'))
                    <p></p>
                    <div id="errorMessage" style="color: red; display: none;">{{ session('failed') }}</div>
                @endif
            </form>

        </div>
    </div>

    {{-- EDIT OFFCANVAS --}}
    <div class="offcanvas offcanvas-end" tabindex="-1" id="editOffCanvasRight" aria-labelledby="editOffCanvasRightLabel"
        style="width: 50%">
        <div class="offcanvas-header">
            <h5 id="editOffCanvasRightLabel">Edit Category</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form id="editCategoryForm" action="{{ route('category.update') }}" method="POST"
                enctype="multipart/form-data">
                @csrf
                <div class="form-floating mb-3">
                    <input class="form-control" name="id" type="hidden" placeholder="" id="id" />
                    <input class="form-control" name="currentImage" id="currentImage" type="hidden" placeholder="" />
                    <input class="form-control" name="editName" type="text" placeholder="Enter the category name"
                        id="editName" />
                    <label for="editName">Category Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control" name="editDescription" type="text"
                        placeholder="Enter the category Description" id="editDescription" />
                    <label for="editDescription">Category Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="file" name="editImage" id="editImage" class="form-control">
                </div>

                <!-- Image Preview -->
                <div class="image-container">
                    <img id="editImagePreview" class="image-preview" src="{{ asset('') }}" alt="Image Preview">
                </div>

                <div class="mt-4 mb-0">
                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Update</button>
                    </div>
                </div>

                <!-- Success Message -->
                @if (session('success'))
                    <div id="successMessage" style="color: green;">{{ session('success') }}</div>
                    <img src="{{ asset('images/' . session('image')) }}" alt="Uploaded Image" class="image-preview">
                @elseif (session('failed'))
                    <p></p>
                    <div id="errorMessage" style="color: red; display: none;">{{ session('failed') }}</div>
                @endif
            </form>

        </div>
    </div>

@endsection
