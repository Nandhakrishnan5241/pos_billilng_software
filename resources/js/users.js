var changePasswordID = "";
$(document).ready(function () {
    var input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch("https://ipinfo.io/json?token=YOUR_API_TOKEN")
                .then((response) => response.json())
                .then((data) => callback(data.country))
                .catch(() => callback("us"));
        },
        separateDialCode: true,
        preferredCountries: ["us", "gb", "in"],
        utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    // edit intel
    var editInput = document.querySelector("#editPhone");
    window.editIti = window.intlTelInput(editInput, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch("https://ipinfo.io/json?token=YOUR_API_TOKEN")
                .then((response) => response.json())
                .then((data) => callback(data.country))
                .catch(() => callback("us"));
        },
        separateDialCode: true,
        preferredCountries: ["us", "gb", "in"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    
    
    getTableData("initial");
    var formValidator = {
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            role: {
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
            role: {
                required: "Select a role",
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

    $("#addUserForm").validate(formValidator);

    $("#addUserForm").on("submit", function (e) {
        if ($("#addUserForm").valid()) {
            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });

            var phoneNumber = iti.getNumber(); // Full phone number with country code
            var countryData = iti.getSelectedCountryData(); // Get selected country data
            var countryCode = countryData.dialCode; // Country code

            var formData = new FormData(document.getElementById("addUserForm"));
            formData.append("phone_number", phoneNumber);
            formData.append("country_code", countryCode);

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
                        document.getElementById("addUserForm").reset();
                        const table = $("#usersTable").DataTable();
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
$("#editUserForm").on("submit", function (e) {
    if ($("#editUserForm").valid()) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        

        const phoneNumber = editIti.getNumber(); // Full phone number with country code
        const countryData = editIti.getSelectedCountryData(); // Get selected country data
        const countryCode = countryData.dialCode; // Country code

        var formData = new FormData(document.getElementById("editUserForm"));

        formData.append("edit_phone_number", phoneNumber);
        formData.append("edit_country_code", countryCode);

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
                    $("#editOffCanvasRight").offcanvas("hide");
                    document.getElementById("editUserForm").reset();
                    const table = $("#usersTable").DataTable();
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
    var table = $("#usersTable").DataTable({
        processing: true,
        serverSide: true,
        stateSave: type === "initial" ? false : true,
        ajax: {
            url: "users/getdetails",
            data: function (d) {
                d.client_id = $("#client").val(); // Pass the selected client ID
            },
        },
        columns: [
            { data: "name", name: "name" },
            { data: "email", name: "email" },
            { data: "role", name: "role" },
            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false,
            },
        ],
    });

    // Override the default search behavior
    $("#usersTable_filter input").unbind();
    $("#usersTable_filter input").on("keypress", function (e) {
        if (e.which === 13) {
            table.search(this.value).draw();
        }
    });
}

// PASSWORD GENERATE
window.generatePassword = function () {
    const length = 10; // Length of the password
    const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    $("#userpassword").val(password);
    return false;
};

window.togglePasswordVisibility = function () {
    const passwordField = document.getElementById("userpassword");
    const toggleIcon = document.getElementById("toggleIcon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
    }
};

window.getSelectedClient = function (selectElement) {
    var selectedClientId = selectElement.value;
    $("#usersTable").DataTable().ajax.reload();
};
// GET ISO CODE(IN) INSTEAD OF DIAL CODE(91)
function getCountryISOByDialCode(dialCode) {
    var countryData = intlTelInputGlobals.getCountryData();
    var country = countryData.find((c) => c.dialCode == dialCode);
    return country ? country.iso2 : null; // Return "IN", "US", etc.
}

// EDIT
window.editData = function (id) {
    $.get("users/" + id + "/edit", function (data) {
        var userPhone           = data.phone;
        var userCountryDialCode = data.country_code;

        var userCountryISO = getCountryISOByDialCode(userCountryDialCode);

        if (userCountryISO && window.editIti) {
            window.editIti.setCountry(userCountryISO.toLowerCase());
        }

        var offcanvas = new bootstrap.Offcanvas(
            document.getElementById("editOffCanvasRight")
        );
        offcanvas.show();

        $("#id").val(data.id);
        $("#editName").val(data.name);
        $("#editEmail").val(data.email);
        $("#editDisplayName").val(data.display_name);
        let rolesArray = Object.values(data.role);
        $("#editRole").val(rolesArray).trigger("change");

        $("#editPhone").val(userPhone.replace(/^\+\d+/, ""));
    });
};

// Update hidden fields on country change
$("#editPhone").on("countrychange", function () {
    var countryData = editIti.getSelectedCountryData(); 
    $("#edit_country_code").val(countryData.iso2.toUpperCase()); 
});

// CHANGE PASSWORD
window.changePassword = function (id) {
    document.getElementById("userChangePasswordForm").reset();
    $.get("users/" + id + "/edit", function (data) {
        changePasswordID = data.id;

        var offcanvas = new bootstrap.Offcanvas(
            document.getElementById("changePasswordCanvas")
        );
        offcanvas.show();
    });
};

var changePasswordFrom = {
    rules: {
        userpassword: {
            required: true,
            minlength: 8,
        },
    },
    messages: {
        userpassword: {
            required: "Password field is required",
            minlength: "Password field must be at least 8 characters",
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

$("#userChangePasswordForm").validate(changePasswordFrom);

$("#userChangePasswordForm").on("submit", function (e) {
    if ($("#userChangePasswordForm").valid()) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        let password = $("#userpassword").val();
        changePasswordID = changePasswordID;

        let formData = new FormData();

        formData.append("changePasswordID", changePasswordID);
        formData.append("password", password);

        $.ajax({
            url: $(this).attr("action"),
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.msg,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    $("#changePasswordCanvas").offcanvas("hide");
                    const table = $("#usersTable").DataTable();
                    table.clear().draw();
                    table.destroy();
                    getTableData("initial");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.msg,
                        // footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.msg,
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
            },
        });
    }
});

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
                url: "users/delete/" + id,
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
                            const table = $("#usersTable").DataTable();
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
