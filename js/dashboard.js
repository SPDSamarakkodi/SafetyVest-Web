// ===============================
// LOGIN CHECK
// ===============================

if(localStorage.getItem("logged") != "true")
{
    window.location.href="index.html";
}



// =================================
// ALERT SOUND CONTROL
// =================================

let alertAudio = new Audio(
    "assets/alarm.mp3"
);

alertAudio.loop = true;


let alertPlaying = false;

let currentAlertID = null;



// ===============================
// LOGOUT
// ===============================

function logout()
{

    localStorage.removeItem("logged");

    window.location.href="index.html";

}





// ===============================
// SENSOR DATA
// ===============================


const sensorRef =
database.ref("sensor");



sensorRef.on(
"value",
(snapshot)=>{


    let data=snapshot.val();



    if(!data)
    {
        return;
    }



    console.log(
        "Sensor:",
        data
    );



    document.getElementById(
        "temperature"
    ).innerHTML =
    data.temperature ?? "--";



    document.getElementById(
        "humidity"
    ).innerHTML =
    data.humidity ?? "--";



    document.getElementById(
        "gas"
    ).innerHTML =
    data.gas ?? "--";



    document.getElementById(
        "heartRate"
    ).innerHTML =
    data.heartRate ?? "--";





    if(data.fall)
    {

        document.getElementById(
            "fall"
        ).innerHTML =
        "🚨 YES";

    }
    else
    {

        document.getElementById(
            "fall"
        ).innerHTML =
        "✅ NO";

    }


});







// =================================
// ALERT SYSTEM
// =================================



firebase.database()
.ref("alerts")
.orderByKey()
.limitToLast(1)
.on(
"child_added",
(snapshot)=>{


    let alert =
    snapshot.val();


    currentAlertID =
    snapshot.key;



    console.log(
        "NEW ALERT:",
        alert
    );



    processAlert(alert);



});





firebase.database()
.ref("alerts")
.orderByKey()
.limitToLast(1)
.on(
"child_changed",
(snapshot)=>{


    let alert =
    snapshot.val();



    console.log(
        "ALERT UPDATED:",
        alert
    );



    processAlert(alert);



});







function processAlert(alert)
{


    // =====================
    // CHECKED
    // =====================


    if(alert.status === "CHECKED")
    {


        console.log(
            "CHECKED ALERT - STOP"
        );


        stopAlert();


        return;


    }






    // =====================
    // NEW
    // =====================


    if(
        alert.status === "NEW" ||
        alert.status == null
    )
    {


        showAlert(alert);


    }



}







// =================================
// SHOW ALERT
// =================================


function showAlert(alert)
{


    if(alertPlaying)
    {
        return;
    }



    let popup =
    document.getElementById(
        "alertPopup"
    );



    let message =
    document.getElementById(
        "alertMessage"
    );





    message.innerHTML = `


    <b>
    🚨 ${alert.type ?? "Emergency"}
    </b>


    <br><br>


    ${alert.message ?? ""}


    <br><br>


    💨 Gas:
    ${alert.gas ?? "--"}


    <br>


    ❤️ Heart:
    ${alert.heartRate ?? "--"}


    <br>


    Status:
    ${alert.status ?? "NEW"}


    `;




    popup.style.display =
    "block";





    alertAudio.play()

    .then(()=>{


        alertPlaying=true;


        console.log(
            "Alarm Started"
        );


    })

    .catch(error=>{


        console.log(
            "Audio Error",
            error
        );


    });



}







// =================================
// OPEN ALERT PAGE
// =================================


function openAlerts()
{

window.location.href =
"pages/alerts.html";

}







// =================================
// STOP ALERT
// =================================


function stopAlert()
{


console.log(
"STOP ALERT"
);



alertAudio.pause();


alertAudio.currentTime=0;


alertPlaying=false;




let popup =
document.getElementById(
"alertPopup"
);



if(popup)
{

popup.style.display="none";

}


}

// =================================
// LIVE ALERT COUNTER
// =================================


const alertCounter =
firebase.database()
.ref("alerts");



alertCounter.on("value", snapshot=>{


console.log(
"Alert Counter Data:",
snapshot.val()
);



let count = 0;



if(snapshot.exists())
{

count =
Object.keys(snapshot.val()).length;

}



let counter =
document.getElementById(
"alertCount"
);



if(counter)
{

counter.innerText=count;

}
else
{

console.log(
"alertCount ID not found"
);

}



});