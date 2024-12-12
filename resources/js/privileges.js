$(document).ready(function () {});
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
var roleID;
window.getSelectedRole = function (selectedRole) {
    roleID = selectedRole.value;
};

window.getSelectedValues = function () {
    const selectedRole = document.getElementById("role").value;
    const checkboxes = document.querySelectorAll(".permission-checkbox");
   
    if (selectedRole === "") {
        $('#role-error').show(); 
        return false;
    } else {
        $('#role-error').hide(); 
    }

    const selectedData = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedData.push({
                module: checkbox.dataset.module,
                action: checkbox.dataset.action,
            });
        }
    });

    // console.log("Selected Role:", selectedRole);
    // console.log("Selected Permissions:", selectedData);

    var data = selectedData;

    const groupedData = data.reduce((acc, curr) => {
        const module = JSON.parse(curr.module);
        const slug = module.slug;

        if (!acc[slug]) {
            acc[slug] = {
                module,
                actions: [],
            };
        }
        acc[slug].actions.push(curr.action);

        return acc;
    }, {});

    // console.log(groupedData)

    // Convert grouped data into an array if needed
    const groupedArray = Object.keys(groupedData).map((slug) => ({
        slug,
        module: groupedData[slug].module,
        actions: groupedData[slug].actions,
    }));

    // console.log(groupedArray);

    addPrivilegesToTable(selectedRole, groupedArray);
};

function addPrivilegesToTable(selectedRole, groupedArray) {
    let data = JSON.stringify(groupedArray);
    $.get(
        "privileges/addpermission/" + selectedRole + "/" + data,
        function (response) {
            if (response.status == 1) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message,
                    // footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        }
    );
}
