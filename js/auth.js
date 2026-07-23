function login(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



if(
email==="admin@gmail.com"
&&
password==="123"
){


localStorage.setItem(
"logged",
"true"
);



window.location.href=
"dashboard.html";


}

else{


document.getElementById("error")
.innerHTML=
"Wrong username or password";


}


}
