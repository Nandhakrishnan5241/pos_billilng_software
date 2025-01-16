var roleID;
var clientID;

$(document).ready(function () {});
// Handle "All" checkbox
document.querySelector("#privilegesTable tbody").addEventListener("change", function (event) {
    if (event.target.classList.contains("all-checkbox")) {
        const rowId = event.target.dataset.row;
        const checkboxes = document.querySelectorAll(
            `.row-checkbox[data-row="${rowId}"]`
        );

        // Set all row-specific checkboxes to match the "All" checkbox state
        checkboxes.forEach((checkbox) => {
            checkbox.checked = event.target.checked;
        });
    }
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

window.getSelectedRole = function (selectedRole) {
    roleID = selectedRole.value;
    console.log('roleID :',roleID);
    updateCheckBoxesByRoleID(roleID)
    
};


window.getSelectedClient = function (selectedClient) {
    clientID = selectedClient.value;
    console.log('clientID :',clientID);
    updateCheckBoxesByClientId(clientID)
};

function updateCheckBoxesByClientId(clientID) {
    $.get(
        "privileges/getprivilegesbyclientid/"+ clientID  ,
        function (response) {
            if (response.status == 1) {
               updateTable(response.data);
              
            } else {
                console.log('else')
            }
        }
    );
}
function updateCheckBoxesByRoleID(roleID) {
    $.get(
        "privileges/getprivilegesbyroleid/"+ roleID  ,
        function (response) {
            if (response.status == 1) {
               updateTable(response.data);
              
            } else {
                console.log('else')
            }
        }
    );
}

function escapeHtml(jsonString) {
    return jsonString.replace(/"/g, '&quot;');
}

function updateTable(data){
    const permissions = data.permissions; // Get permissions for the selected client
    var modules = data.modules;

    const tableBody = document.getElementById('privilegesTableBody');

    tableBody.innerHTML = '';

    modules.forEach((module, index) => {
        const moduleSlug = module.slug;
        const escapedModule = escapeHtml(JSON.stringify(module));  // Escape module for HTML attribute
        
        // Create a new row
        const row = document.createElement('tr');
        row.setAttribute('data-row', index);
    
        // Create row HTML
        const rowHTML = `
            <td>${index + 1}</td>
            <td>${module.name}</td>
            <td><input type="checkbox" class="all-checkbox" data-row="${index}" data-module="${escapedModule}" data-action="all"></td>
            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="${index}" data-module="${escapedModule}" data-action="create" ${permissions.includes(moduleSlug + '.create') ? 'checked' : ''}></td>
            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="${index}" data-module="${escapedModule}" data-action="view" ${permissions.includes(moduleSlug + '.view') ? 'checked' : ''}></td>
            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="${index}" data-module="${escapedModule}" data-action="edit" ${permissions.includes(moduleSlug + '.edit') ? 'checked' : ''}></td>
            <td><input type="checkbox" class="row-checkbox permission-checkbox" data-row="${index}" data-module="${escapedModule}" data-action="delete" ${permissions.includes(moduleSlug + '.delete') ? 'checked' : ''}></td>
        `;
        
        // Set row HTML and append to table body
        row.innerHTML = rowHTML;
        document.querySelector("#privilegesTable tbody").appendChild(row);
    });
}
           
window.getSelectedValues = function () {
    const selectedRole   = document.getElementById("role").value;
    const selectedClient = document.getElementById("client").value;
    const checkboxes     = document.querySelectorAll(".permission-checkbox");
   
    if (selectedRole === "") {
        $('#role-error').show(); 
        return false;
    } else {
        $('#role-error').hide(); 
    }

    if (selectedClient === "") {
        $('#client-error').show(); 
        return false;
    } else {
        $('#client-error').hide(); 
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

    // Convert grouped data into an array if needed
    const groupedArray = Object.keys(groupedData).map((slug) => ({
        slug,
        module: groupedData[slug].module,
        actions: groupedData[slug].actions,
    }));

    // console.log(groupedArray);

    addPrivilegesToTable(selectedRole, selectedClient, groupedArray);
};

function addPrivilegesToTable(selectedRole, selectedClient, groupedArray) {
    let data = JSON.stringify(groupedArray);
    $.get(
        "privileges/addpermission/" + selectedRole + "/" + selectedClient + "/" +data ,
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
