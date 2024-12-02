$(document).ready(function () {
    getTableData('initial');

    $("#image").change(function (event) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#imagePreview").attr("src", reader.result);
            $(".image-container").show();
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    $("#editImage").change(function (event) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#editImagePreview").attr("src", reader.result);
            $(".image-container").show();
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // on submit
    $('#categoryForm').on('submit', function(e) {
        e.preventDefault(); 
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
        let name        = $('#name').val();
        let description = $('#description').val();
        let image       = $('#image')[0].files[0];

        let formData = new FormData(); 

        formData.append('name', name);   
        formData.append('description', description);
        formData.append('image', image); 
     

        $.ajax({
            url: $(this).attr('action'), 
            method: 'POST',
            data: formData,
            processData: false, 
            contentType: false, 
            success: function(response) {
                if (response.success) {
                    $('#successMessage').text(response.success).show();
                    $('#errorMessage').hide();
                    $('#imagePreview').attr('src', response.imageUrl);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.success,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: 'Something went wrong!',
                        // footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            },
            error: function(xhr, status, error) {
                let errors = xhr.responseJSON.errors;
                let errorMessage = '';

                if (errors) {
                    $.each(errors, function(key, value) {
                        errorMessage += value[0] + '<br>';
                    });
                }
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });

                $('#errorMessage').html(errorMessage).show();
                $('#successMessage').hide();
            }
        });
    });    

    // edit category 
    $('#editCategoryForm').on('submit', function(e) {
        e.preventDefault(); 

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
  
        let id              = $('#id').val();
        let editName        = $('#editName').val();
        let editDescription = $('#editDescription').val();
        let editImage       = ($('#editImage')[0].files[0] ? $('#editImage')[0].files[0] :  $('#currentImage').val());

        let formData = new FormData(); 

        formData.append('id', id);   
        formData.append('name', editName);   
        formData.append('description', editDescription);
        formData.append('image', editImage); 
     
        $.ajax({
            url: $(this).attr('action'), 
            method: 'POST',
            data: formData,
            processData: false, 
            contentType: false, 
            success: function(response) {
                if (response.success) {
                    $('#successMessage').text(response.success).show();
                    $('#errorMessage').hide();
                    $('#imagePreview').attr('src', response.imageUrl);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.success,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                }
            },
            error: function(xhr, status, error) {
                let errors = xhr.responseJSON.errors;
                let errorMessage = '';

                if (errors) {
                    $.each(errors, function(key, value) {
                        errorMessage += value[0] + '<br>';
                    });
                }
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });

                $('#errorMessage').html(errorMessage).show();
                $('#successMessage').hide();
            }
        });
    });  
});

function getTableData(type) {
    var table = $('#categories-table').DataTable({
        processing: true,
        serverSide: true,
        stateSave: type === 'initial' ? false : true,
        ajax: "category/getdetails", 
        columns: [
            { data: 'name', name: 'name' },
            { data: 'description', name: 'description' },
            { data: 'image', name: 'image', orderable: false, searchable: false },
            { data: 'action', name: 'action', orderable: false, searchable: false }
        ]
    });

    // Override the default search behavior
    $('#categories-table_filter input').unbind(); 
    $('#categories-table_filter input').on('keypress', function (e) {
        if (e.which === 13) { 
            table.search(this.value).draw(); 
        }
    });
}

// EDIT
window.editData = function(id) {
    $.get( 'category/' +id + '/edit', function(data) {
        console.log(data)
        
        var offcanvas = new bootstrap.Offcanvas(document.getElementById('editOffCanvasRight'));
        offcanvas.show();
        $('#id').val(data.id);
        $('#editName').val(data.name);
        $('#editDescription').val(data.description);
        $('#currentImage').val(data.image);
        $("#editImagePreview").attr("src", data.image);
        $(".image-container").show();
        
    });
};

// DELETE
window.deleteData = function(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You would like to delete this Category",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#139fc7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set the CSRF token for the AJAX request
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "GET",
                url: "category/delete/" + id,
                data: {
                    id: id,
                    _token: $('input[name="_token"]').val() // CSRF token
                },
                success: function (data) {
                    if (data.status == 200) {
                        Swal.fire({
                            title: "Success",
                            text: "Data Deleted Successfully!",
                            icon: "success",
                            confirmButtonText: "Ok",
                        }).then(() => {

                            const table = $('#categories-table').DataTable();
                            table.clear().draw();
                            table.destroy();

                            getTableData('update');
                            // window.location.reload();

                        });
                    } else {
                        // Handle unexpected status
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong!",
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    }
                },
                error: function (xhr) {
                    Swal.fire({
                        title: "Error",
                        text: xhr.responseJSON.message || "An error occurred.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Cancelled",
                text: "Your operation has been cancelled",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    });
};



