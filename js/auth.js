function login(){


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;



// =========================
// EMPTY VALIDATION
// =========================

if(email === "" || password === "")
{

showError(
"Please enter email and password"
);

return;

}



// =========================
// EMAIL FORMAT VALIDATION
// =========================

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if(!emailPattern.test(email))
{

showError(
"Please enter a valid email address"
);

return;

}



// =========================
// PASSWORD VALIDATION
// =========================


if(password.length < 6)
{

showError(
"Password must contain at least 6 characters"
);

return;

}



// =========================
// START LOADING
// =========================

setLoading(true);



// =========================
// FIREBASE LOGIN
// =========================


firebase.auth()

.signInWithEmailAndPassword(
email,
password
)


.then((userCredential)=>{


    
console.log(
"Login Successful",
userCredential.user.email
);


// save session

localStorage.setItem(
"adminEmail",
userCredential.user.email
);



window.location.href =
"dashboard.html";



})



.catch((error)=>{


setLoading(false);



let message =
"Login failed";


switch(error.code)
{


case "auth/user-not-found":

message =
"Account not found";

break;



case "auth/wrong-password":

message =
"Incorrect password";

break;



case "auth/invalid-email":

message =
"Invalid email format";

break;



case "auth/invalid-credential":

message =
"Invalid email or password";

break;


default:

message =
"Something went wrong";

}



showError(message);



});

}






// =========================
// ERROR DISPLAY
// =========================

function showError(message)
{

const errorBox =
document.getElementById("error");


const errorText =
document.getElementById("errorText");



errorText.innerHTML =
message;



errorBox.classList.add("show");


}





// =========================
// LOGIN BUTTON LOADING
// =========================


function setLoading(status)
{


const button =
document.querySelector(".btn-login");



if(status)
{

button.disabled=true;


button.innerHTML =
`
<i class="bi bi-arrow-repeat"></i>
Checking...
`;

}

else
{

button.disabled=false;


button.innerHTML =
`
<i class="bi bi-box-arrow-in-right"></i>
Sign In
`;

}


}


function logout()
{

firebase.auth()
.signOut()

.then(()=>{


localStorage.removeItem(
"adminEmail"
);


window.location.href =
"index.html";


});


}

// ===============================
// AUTH PAGE PROTECTION
// ===============================

function checkAuth(isPage = false)
{

    firebase.auth()
    .onAuthStateChanged((user)=>{


        if(!user)
        {


            if(isPage)
            {

                window.location.href =
                "../index.html";

            }
            else
            {

                window.location.href =
                "index.html";

            }


        }


    });


}

function togglePassword()
{

const password =
document.getElementById("password");


const icon =
document.getElementById("eyeIcon");



if(password.type==="password")
{

password.type="text";

icon.className=
"bi bi-eye-slash";

}

else
{

password.type="password";

icon.className=
"bi bi-eye";

}


}