var roleID;
var clientID;

$(document).ready(function () {
    let role = $("#role");
    if (role.find("option").length > 1) {
        role.prop("selectedIndex", 1).trigger("change");
    }
    let client = $("#client");
    if (client.find("option").length > 1) {
        client.prop("selectedIndex", 1).trigger("change");
    }
    updatePrivilegesByClientAndRoleID();
});
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
        const rowId       = this.dataset.row;
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
/**--------------------------------currently not in use------------------------------------- */
window.getSelectedRole = function (selectedRole) {
    roleID = selectedRole.value;
    updateCheckBoxesByRoleID(roleID)
};

/**--------------------------------currently not in use------------------------------------- */
window.getSelectedClient = function (selectedClient) {
    clientID = selectedClient.value;
    updateCheckBoxesByClientId(clientID)
};

/**----------------------------update privileges by both client and role ID--------------------------- */
window.updatePrivilegesByClientAndRoleID = function(){
    const roleId   = $('#role').val();
    const clientId = $('#client').val();

    const roleSelect = $('#role');

    if (clientId != 1 && clientId != undefined) {
        roleSelect.find('option[value="1"]').hide(); 
        
        let availableRole = roleSelect.find('option:not(:disabled):not([value="1"])').first().val();
        
        if (availableRole && roleSelect.val() === "1") {
            roleSelect.val(availableRole); 
        }
    } else {
        roleSelect.find('option[value="1"]').show(); 
    }

    $.get(
        "privileges/getprivilegesbyclientandroleid/"+ roleId + "/" + clientId,
        function (response) {
            if (response.status == 1) {
               updateTable(response.data);
               $('#privelegesTable').show();
              
            } else {
                console.log('else')
            }
        }
    );
}
/**----------------------------update privileges only by client ID--------------------------- */
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
/**----------------------------update privileges only by role ID--------------------------- */
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

    addPrivilegesToTable(selectedRole, selectedClient, groupedArray);
};

function addPrivilegesToTable(selectedRole, selectedClient, groupedArray) {
    let data        = JSON.stringify(groupedArray);
    let encodedData = encodeURIComponent(data);
    $.get(
        "privileges/addpermission/" + selectedRole + "/" + selectedClient + "/" + encodedData ,
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
