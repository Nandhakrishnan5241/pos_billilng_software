$(document).ready(function () {
    getTableData("initial");

    var formValidator = {
        rules: {
            name: {
                required: true,
            },
            // order: {
            //     required: true,
            // },
            // status: {
            //     required: true,
            // },
        },
        messages: {
            name: {
                required: "Name field is required",
            },
            // order: {
            //     required: "Order field is required",
            // },
            // status: {
            //     required: "Status field is required",
            // },
        },
        highlight: function (element) {
            $(element).addClass("validation");
            $(element).next("span").addClass("validation");
        },
        unhighlight: function (element) {
            $(element).removeClass("validation");
            $(element).next("span").removeClass("validation");
        },
        errorPlacement: function (error, element) {
            element.attr("placeholder", error.text()).addClass("validation");
            element.next("span").addClass("validation");
        },
        debug: false,
        submitHandler: function (form) {
            // form.submit();
        },
    };

    $("#moduleForm").validate(formValidator);

    $("#moduleForm").on("submit", function (e) {
        if ($("#moduleForm").valid()) {
            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });
            var formData = new FormData(document.getElementById("moduleForm"));

            $.ajax({
                url: $(this).attr("action"),
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if (response.status == 1) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        $("#offcanvasRight").offcanvas('hide');
                        document.getElementById('moduleForm').reset();
                        const table = $("#modulesTable").DataTable();
                        table.clear().draw();
                        table.destroy();

                        getTableData("initial");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: response.message,
                            // footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    let errors = xhr.responseJSON.errors;
                    let errorMessage = "";

                    if (errors) {
                        $.each(errors, function (key, value) {
                            errorMessage += value[0] + "<br>";
                        });
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>',
                    });
                },
            });
        }
    });
});

// update
$("#editModuleForm").on("submit", function (e) {
    if ($("#editModuleForm").valid()) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        var formData = new FormData(document.getElementById("editModuleForm"));

        $.ajax({
            url: $(this).attr("action"),
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status == 1) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    $("#editOffCanvasRight").offcanvas('hide');

                    const table = $("#modulesTable").DataTable();
                    table.clear().draw();
                    table.destroy();
                    getTableData("initial");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.message,
                        // footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            },
            error: function (xhr, status, error) {
                let errors = xhr.responseJSON.errors;
                let errorMessage = "";

                if (errors) {
                    $.each(errors, function (key, value) {
                        errorMessage += value[0] + "<br>";
                    });
                }

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
            },
        });
    }
});

function getTableData(type) {
    var table = $("#modulesTable").DataTable({
        processing: true,
        serverSide: true,
        stateSave: type === "initial" ? false : true,
        ajax: "module/getdetails",
        columns: [
            { data: "name", name: "name" },
            { data: "slug", name: "slug" },
            { data: "order", name: "order" },
            // { data: "status", name: "status" },
            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false,
            },
        ],
    });

      // Override the default search behavior
      $('#modulesTable_filter input').unbind(); 
      $('#modulesTable_filter input').on('keypress', function (e) {
          if (e.which === 13) { 
              table.search(this.value).draw(); 
          }
      });
}

// EDIT
window.editData = function (id) {
    $.get("module/" + id + "/edit", function (data) {

        var offcanvas = new bootstrap.Offcanvas(
            document.getElementById("editOffCanvasRight")
        );
        offcanvas.show();
        $("#id").val(data.id);
        $("#editName").val(data.name);
        // $("#editOrder").val(data.order);
        // $("#editStatus").val(data.status);
    });
};

//Delete
window.deleteData = function (id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You would like to delete this Category",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#139fc7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            // Set the CSRF token for the AJAX request
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });
            $.ajax({
                type: "GET",
                url: "module/delete/" + id,
                data: {
                    id: id,
                    _token: $('input[name="_token"]').val(), // CSRF token
                },
                success: function (data) {
                    if (data.status == 200) {
                        Swal.fire({
                            title: "Success",
                            text: "Data Deleted Successfully!",
                            icon: "success",
                            confirmButtonText: "Ok",
                        }).then(() => {
                            const table = $("#modulesTable").DataTable();
                            table.clear().draw();
                            table.destroy();

                            getTableData("update");
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
                },
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
