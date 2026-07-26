const usersRef = database.ref("users");

const tableBody = document.getElementById("userTableBody");

const searchUser =
    document.getElementById("searchUser");

const roleFilter =
    document.getElementById("roleFilter");


let allUsers = {};

const addUserBtn = document.getElementById("addUserBtn");
const saveUserBtn = document.getElementById("saveUserBtn");

const userModal = new bootstrap.Modal(
    document.getElementById("userModal")
);

let editingUserId = null;

// Load users from Firebase
usersRef.on("value", (snapshot) => {

    allUsers = {};

    snapshot.forEach((child) => {

        allUsers[child.key] = child.val();

    });

    displayUsers();

});


function clearForm() {

    document.getElementById("userForm").reset();

}



addUserBtn.addEventListener("click", () => {

    editingUserId = null;

    clearForm();

    document.getElementById("userId").disabled = false;

    userModal.show();

});





saveUserBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    const emergencyName =
        document.getElementById("emergencyName").value.trim();

    const emergencyPhone =
        document.getElementById("emergencyPhone").value.trim();

    const emergencyEmail =
        document.getElementById("emergencyEmail").value.trim();

    if (name === "" || email === "") {

        alert("Please fill in all required fields.");

        return;

    }

const userId = document.getElementById("userId").value.trim();

if (userId === "") {

    alert("Please enter a User ID.");

    return;

}

const id = editingUserId || userId;


usersRef.child(id).once("value")
.then((snapshot)=>{


    // Prevent duplicate IDs when adding new users

    if(snapshot.exists() && editingUserId === null){

        alert(
            "User ID already exists. Please use another ID."
        );

        return;

    }


    usersRef.child(id).set({

        userId: id,

        name: name,

        email: email,

        role: role,

        emergencyContact: {

            name: emergencyName,

            phone: emergencyPhone,

            email: emergencyEmail

        }

    })


    .then(()=>{


        alert(

            editingUserId

            ?

            "User updated successfully."

            :

            "User added successfully."

        );


        editingUserId = null;


        document.getElementById("userId").disabled = false;


        userModal.hide();


        clearForm();


    });


});

});






// Placeholder functions (implemented later)
function editUser(userId) {

    usersRef.child(userId).once("value")
        .then((snapshot) => {

            if (!snapshot.exists()) return;

            const user = snapshot.val();

            editingUserId = userId;

            document.getElementById("userId").value = userId;
            document.getElementById("userId").disabled = true;

            document.getElementById("name").value = user.name || "";
            document.getElementById("email").value = user.email || "";
            document.getElementById("role").value = user.role || "Worker";

            document.getElementById("emergencyName").value =
                user.emergencyContact?.name || "";

            document.getElementById("emergencyPhone").value =
                user.emergencyContact?.phone || "";

            document.getElementById("emergencyEmail").value =
                user.emergencyContact?.email || "";

            userModal.show();

        })
        .catch((error) => {

            alert(error.message);

        });

}

function deleteUser(userId) {

    const confirmed = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    usersRef.child(userId)
        .remove()
        .then(() => {

            alert("User deleted successfully.");

        })
        .catch((error) => {

            alert(error.message);

        });

}

function displayUsers() {

    tableBody.innerHTML = "";


    const searchText =
        searchUser.value.toLowerCase();


    const selectedRole =
        roleFilter.value;


    let found = false;


    Object.keys(allUsers).forEach((userId) => {


        const user = allUsers[userId];


        const matchSearch =

            userId.toLowerCase()
            .includes(searchText)

            ||

            (user.name || "")
            .toLowerCase()
            .includes(searchText)

            ||

            (user.email || "")
            .toLowerCase()
            .includes(searchText);



        const matchRole =

            selectedRole === "all"

            ||

            user.role === selectedRole;



        if(matchSearch && matchRole) {


            found = true;


            tableBody.innerHTML += `

            <tr>

                <td>${user.userId || userId}</td>

                <td>${user.name || "-"}</td>

                <td>${user.email || "-"}</td>

                <td>

                    <span class="badge 
${
    user.role === "Admin"
    ?
    "bg-danger"
    :
    user.role === "Supervisor"
    ?
    "bg-warning text-dark"
    :
    "bg-success"
}">

${user.role || "-"}

</span>

                </td>

                <td>
                    ${user.emergencyContact?.name || "-"}
                </td>

                <td>
                    ${user.emergencyContact?.phone || "-"}
                </td>

                <td>

<button
class="btn btn-warning btn-sm me-1"
title="Edit User"
onclick="editUser('${userId}')">

<i class="bi bi-pencil-square"></i>

</button>


<button
class="btn btn-danger btn-sm"
title="Delete User"
onclick="deleteUser('${userId}')">

<i class="bi bi-trash"></i>

</button>



                </td>

            </tr>

            `;

        }


    });



    if(!found){

        tableBody.innerHTML = `

        <tr>

        <td colspan="7"
        class="text-center text-muted">

        No matching users found

        </td>

        </tr>

        `;

    }

}


searchUser.addEventListener(
    "input",
    displayUsers
);


roleFilter.addEventListener(
    "change",
    displayUsers
);