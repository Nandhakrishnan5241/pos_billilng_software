$(document).ready(function () {
    getTableData("initial");

    $("#logo").change(function (event) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#imagePreview").attr("src", reader.result);
            $(".image-container").show();
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    $("#editLogo").change(function (event) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#editImagePreview").attr("src", reader.result);
            $(".image-container").show();
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    var formValidator = {
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            mobile: {
                required: true,
            },
            address: {
                required: true,
            },
            logo: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Name field is required",
            },
            email: {
                required: "Please enter a valid email address",
            },
            mobile: {
                required: "mobile field is required",
            },
            address: {
                required: "address field is required",
            },
            logo: {
                required: "logo field is required",
            },
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

    $("#addClientForm").validate(formValidator);

    // save
    $("#addClientForm").on("submit", function (e) {
        if ($("#addClientForm").valid()) {
            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });
            var formData = new FormData(
                document.getElementById("addClientForm")
            );
            // var superadmin = $("#superadmin").is(":checked") ? 1 : 0;
            // formData.append("superadmin", superadmin);
            var subscribe = $("#subscribe").is(":checked") ? 1 : 0;
            formData.append("subscribe", subscribe);

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
                        $("#offcanvasRight").offcanvas("hide");
                        document.getElementById("addClientForm").reset();
                        const table = $("#clientsTable").DataTable();
                        $('#imagePreview').hide();
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

var editFormValidator = {
    rules: {
        editName: {
            required: true,
        },
        editEmail: {
            required: true,
            email: true,
        },
        editMobile: {
            required: true,
        },
        editAddress: {
            required: true,
        },
        // editLogo: {
        //     required: true,
        // },
    },
    messages: {
        editName: {
            required: "Name field is required",
        },
        editEmail: {
            required: "Please enter a valid email address",
        },
        editMobile: {
            required: "mobile field is required",
        },
        editAddress: {
            required: "address field is required",
        },
        // editLogo: {
        //     required: "logo field is required",
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

$("#editClientForm").validate(editFormValidator);

$("#editClientForm").on("submit", function (e) {
    if ($("#editClientForm").valid()) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        var formData = new FormData(document.getElementById("editClientForm"));
        var superadmin = $("#editSuperadmin").is(":checked") ? 1 : 0;
        var subscribe = $("#editSubscribe").is(":checked") ? 1 : 0;
        formData.append("superadmin", superadmin);
        formData.append("subscribe", subscribe);

        $.ajax({
            url: $(this).attr("action"),
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                if (response.status == 1) {
                    console.log(response);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    $("#editOffCanvasRight").offcanvas("hide");
                    document.getElementById("editClientForm").reset();
                    $('#editImagePreview').hide();
                    const table = $("#clientsTable").DataTable();
                    table.clear().draw();
                    table.destroy();
                    getTableData("update");
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
    var table = $("#clientsTable").DataTable({
        processing: true,
        serverSide: true,
        stateSave: type === "initial" ? false : true,
        ajax: "clients/getdetails",
        columns: [
            { data: "company_name", name: "company_name" },
            { data: "email", name: "email" },
            { data: "mobile", name: "mobile" },
            { data: "company_logo", name: "company_logo" },
            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false,
            },
        ],
    });

    // Override the default search behavior
    $("#clientsTable_filter input").unbind();
    $("#clientsTable_filter input").on("keypress", function (e) {
        if (e.which === 13) {
            table.search(this.value).draw();
        }
    });
}

// EDIT
window.editData = function (id) {
    $.get("clients/" + id + "/edit", function (data) {
        var offcanvas = new bootstrap.Offcanvas(
            document.getElementById("editOffCanvasRight")
        );
        offcanvas.show();

        $("#id").val(data.id);
        $("#editName").val(data.company_name);
        $("#editEmail").val(data.email);
        $("#editMobile").val(data.mobile);
        $("#editAddress").val(data.address);
        $("#editCity").val(data.city);
        $("#editPincode").val(data.pincode);
        $("#editState").val(data.state);
        $("#editCountry").val(data.country);
        $("#currentImage").val(data.company_logo);
        if (data.is_subscribed === 1) {
            $("#editSubscribe").prop("checked", true); 
        } else {
            $("#editSubscribe").prop("checked", false); 
        }
        $("#editImagePreview").attr("src", data.company_logo);
        $(".image-container").show();
    });
};

// DELETE
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
                url: "clients/delete/" + id,
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
                            const table = $("#clientsTable").DataTable();
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
