@extends('layouts.admin')

@section('title', 'Add Category')
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
@section('content')

    <div class="mt-4 h4">Add Category <a href="{{url('category')}}" class="btn btn-danger float-end">Back</a></div>
    <hr>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Category</h3></div>
                                <div class="card-body">
                                    <form action="{{route('category.save')}}" method="POST" enctype="multipart/form-data">
                                        @csrf
                                        <div class="form-floating mb-3">
                                            <input class="form-control" name="name" type="text" placeholder="Enter the category name" />
                                            <label for="inputEmail">Category Name</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" name="description" type="text" placeholder="Enter the category Description" />
                                            <label for="inputEmail">Category Description</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="file" name="image" id="image" class="form-control">
                                        </div>
                                        <div class="image-container">
                                            <img id="imagePreview" class="image-preview" src="" alt="Image Preview">
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid"><button class="btn btn-primary" type="submit">Save</button></div>
                                        </div>
                                        <!-- Success Message -->
                                        {{-- @if (session('success'))
                                            <p>{{ session('success') }}</p>
                                            <img src="{{ asset('images/'. session('image')) }}" alt="Uploaded Image">
                                        @elseif (session('failed'))
                                            <p>{{ session('failed') }}</p>
                                        @endif --}}

                                        <div id="successMessage" style="color: green; display: none;"></div>

                                        <!-- Error Message -->
                                        <div id="errorMessage" style="color: red; display: none;"></div>

                                        <!-- Image Preview -->
                                        
                                    </form>
                        
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $('#image').change(function (event) {
                let reader = new FileReader();
                reader.onload = function () {
                    $('#imagePreview').attr('src', reader.result);
                    $('.image-container').show(); 
                };
                reader.readAsDataURL(event.target.files[0]);
               
            });
        });
    </script>
@endsection
