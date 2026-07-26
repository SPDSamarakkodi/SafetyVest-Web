function login(){


    const email =
    document.getElementById("email").value.trim();


    const password =
    document.getElementById("password").value;



    if(email === "" || password === "")
    {

        document.getElementById("error").innerHTML =
        "Please enter email and password";

        return;

    }



    firebase.auth()
    .signInWithEmailAndPassword(
        email,
        password
    )

    .then((userCredential)=>{


        console.log(
            "Login successful:",
            userCredential.user.email
        );


        window.location.href =
        "dashboard.html";


    })


    .catch((error)=>{


        console.log(error);


        let message = "Login failed";


if(error.code === "auth/invalid-credential")
{
    message =
    "Invalid email or password";
}


if(error.code === "auth/user-not-found")
{
    message =
    "User account not found";
}


document.getElementById("error")
.innerHTML =
message;


    });


}

function logout(){


    firebase.auth()
    .signOut()
    .then(()=>{


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