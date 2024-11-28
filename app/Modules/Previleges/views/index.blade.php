@extends('layouts.admin')

@section('title', 'Manage Previleges')
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

@vite(['resources/js/previleges.js'])

@section('content')

    <div class="mt-4 h4">Manage Previleges
        {{-- <button class="btn btn-primary float-end me-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add Permission</button> --}}
    </div>
    <hr>
    <div class="row mt-3">
        <div class="col-4">
            <select class="form-select" name="role" id="role" onchange="getSelectedRole(this)">
                <option value="" disabled selected>Select a role</option>
                @foreach ($roles as $key => $value)
                    <option value="{{ $value['id'] }}">{{ $value['name'] }}</option>
                @endforeach
            </select>
        </div>
        <div class="table-responsive mt-3">
            <table id="previlegesTable" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Module</th>
                        <th>All</th>
                        <th>Create</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Disable</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $i = 1;
                    @endphp

                    @foreach ($modules as $index => $module)
                        <tr data-row="{{ $index }}">
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $module['name'] }}</td>
                            <td><input type="checkbox" class="all-checkbox" data-row="{{ $index }}" data-module="{{ $module }}" data-action="all"></td>
                            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="{{ $index }}" data-module="{{ $module }}" data-action="create"></td>
                            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="{{ $index }}" data-module="{{ $module }}" data-action="view"></td>
                            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="{{ $index }}" data-module="{{ $module }}" data-action="edit"></td>
                            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="{{ $index }}" data-module="{{ $module }}" data-action="delete"></td>
                            <td><input type="checkbox" class="disable-checkbox" data-row="{{ $index }}" data-action="disable"></td>
                        </tr>
                    @endforeach

                    {{-- @foreach ($modules as $index =>$module)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $module['name'] }}</td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="all"></td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="create"></td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="view"></td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="edit"></td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="delete"></td>
                            <td><input type="checkbox" class="permission-checkbox" data-module="{{ $module }}" data-action="disable"></td>
                           
                        </tr>
                    @endforeach --}}
                </tbody>
            </table>
            <button class="btn btn-primary mt-3" onclick="getSelectedValues()">Submit</button>
        </div>
    </div>

    {{-- <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Handle "All" checkbox
            document.querySelectorAll(".all-checkbox").forEach((allCheckbox) => {
                allCheckbox.addEventListener("change", function () {
                    const rowId = this.dataset.row;
                    const checkboxes = document.querySelectorAll(
                        `.row-checkbox[data-row="${rowId}"]`
                    );
    
                    checkboxes.forEach((checkbox) => {
                        checkbox.checked = this.checked;
                    });
                });
            });
    
            // Handle "Disable" checkbox
            document.querySelectorAll(".disable-checkbox").forEach((disableCheckbox) => {
                disableCheckbox.addEventListener("change", function () {
                    const rowId = this.dataset.row;
                    const allCheckbox = document.querySelector(
                        `.all-checkbox[data-row="${rowId}"]`
                    );
                    const checkboxes = document.querySelectorAll(
                        `.row-checkbox[data-row="${rowId}"]`
                    );
    
                    // Uncheck all if disable is checked
                    if (this.checked) {
                        allCheckbox.checked = false;
                        checkboxes.forEach((checkbox) => {
                            checkbox.checked = false;
                        });
                    }
                });
            });
        });
    </script> --}}

@endsection
