$(document).ready(function () {
    // $("#changePasswordForm").validate({
    //     rules: {
    //         password: {
    //             required: true,
    //             minlength: 8,
    //         },
    //         newpassword: {
    //             required: true,
    //             minlength: 8,
    //         },
    //         confirmpassword: {
    //             required: true,
    //             equalTo: "#newpassword",
    //         },
    //     },
    //     messages: {
    //         password: {
    //             required: "Password field is required",
    //             minlength: "Password field must be at least 8 characters",
    //         },
    //         newpassword: {
    //             required: "Password field is required",
    //             minlength: "Password field must be at least 8 characters",
    //         },
    //         confirmpassword: {
    //             required: "Confirm field password is required",
    //             equalTo:
    //                 "New Password field and confirm password field should same",
    //         },
    //     },
    // });

    var formValidator = {
        rules: {
            password: {
                required: true,
                minlength: 8,
            },
            newpassword: {
                required: true,
                minlength: 8,
            },
            confirmpassword: {
                required: true,
                equalTo: "#newpassword",
            },
        },
        messages: {
            password: {
                required: "Password field is required",
                minlength: "Password field must be at least 8 characters",
            },
            newpassword: {
                required: "Password field is required",
                minlength: "Password field must be at least 8 characters",
            },
            confirmpassword: {
                required: "Confirm field password is required",
                equalTo:
                    "New Password field and confirm password field should same",
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

    $("#changePasswordForm").validate(formValidator);

    $("#changePasswordForm").on("submit", function (e) {
        if ($("#changePasswordForm").valid()) {
            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
            });

            let password = $("#password").val();
            let newpassword = $("#newpassword").val();
            let confirmpassword = $("#confirmpassword");

            let formData = new FormData();

            formData.append("password", password);
            formData.append("newpassword", newpassword);
            formData.append("confirmpassword", confirmpassword);

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
                        window.location.reload();
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
});
