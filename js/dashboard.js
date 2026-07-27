// =================================
// SENSOR STATUS CHECK
// =================================

function updateSensorStatus(data)
{


    // Temperature

    const temperatureStatus =
    document.getElementById(
        "temperatureStatus"
    );


    if(data.temperature > 40)
    {

        temperatureStatus.innerHTML =
        "🔴 High Temperature";

        temperatureStatus.className =
        "small text-danger";

    }
    else
    {

        temperatureStatus.innerHTML =
        "🟢 Normal";

        temperatureStatus.className =
        "small text-success";

    }



    // Humidity

    const humidityStatus =
    document.getElementById(
        "humidityStatus"
    );


    if(
        data.humidity < 30 ||
        data.humidity > 80
    )
    {

        humidityStatus.innerHTML =
        "🟡 Unusual";

        humidityStatus.className =
        "small text-warning";

    }
    else
    {

        humidityStatus.innerHTML =
        "🟢 Normal";

        humidityStatus.className =
        "small text-success";

    }



    // Gas

    const gasStatus =
    document.getElementById(
        "gasStatus"
    );


    if(data.gas >= 950)
    {

        gasStatus.innerHTML =
        "🔴 Dangerous Gas";

        gasStatus.className =
        "small text-danger";

    }
    else
    {

        gasStatus.innerHTML =
        "🟢 Safe";

        gasStatus.className =
        "small text-success";

    }



    // Heart Rate

    const heartStatus =
    document.getElementById(
        "heartStatus"
    );


    if(
        data.heartRate < 60 ||
        data.heartRate > 120
    )
    {

        heartStatus.innerHTML =
        "🟡 Check Worker";

        heartStatus.className =
        "small text-warning";

    }
    else
    {

        heartStatus.innerHTML =
        "🟢 Normal";

        heartStatus.className =
        "small text-success";

    }



    // Fall

    const fallStatus =
    document.getElementById(
        "fallStatus"
    );


    if(data.fall === true)
    {

        fallStatus.innerHTML =
        "🚨 FALL DETECTED";

        fallStatus.className =
        "small text-danger";

    }
    else
    {

        fallStatus.innerHTML =
        "🟢 Safe";

        fallStatus.className =
        "small text-success";

    }


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






let lastSensorUpdate = null;


function updateConnectionStatus()
{

    const status =
    document.getElementById(
        "workerStatus"
    );


    const last =
    document.getElementById(
        "lastUpdated"
    );


    if(!lastSensorUpdate)
    {

        return;

    }


    const now =
    new Date();


    const diff =
    (now - lastSensorUpdate)
    /1000;



    if(diff < 30)
    {

        status.innerHTML =
        "🟢 ONLINE";


        status.className =
        "text-success";

    }
    else
    {

        status.innerHTML =
        "🔴 OFFLINE";


        status.className =
        "text-danger";

    }


}


// =================================
// FIREBASE CONNECTION STATUS
// =================================

const firebaseStatus =
document.getElementById(
    "firebaseStatus"
);


database.ref(".info/connected")
.on(
"value",
(snapshot)=>{


    if(snapshot.val() === true)
    {

        firebaseStatus.innerHTML =
        "🟢 Firebase Connected";


        firebaseStatus.className =
        "text-success";

    }
    else
    {

        firebaseStatus.innerHTML =
        "🔴 Firebase Disconnected";


        firebaseStatus.className =
        "text-danger";

    }


});




// =================================
// WORKER SAFETY SUMMARY
// =================================

function updateSafetyStatus(data)
{

    const safetyStatus =
    document.getElementById(
        "safetyStatus"
    );


    const safetyMessage =
    document.getElementById(
        "safetyMessage"
    );


    let status = "SAFE";

    let messages = [];



    // Fall detection

    if(data.fall === true)
    {

        status = "DANGER";

        messages.push(
            "Fall detected"
        );

    }



    // Gas level

    if(data.gas >= 950)
    {

        if(status !== "DANGER")
        {
            status = "WARNING";
        }


        messages.push(
            "High gas level"
        );

    }



    // Temperature

    if(data.temperature > 40)
    {

        if(status !== "DANGER")
        {
            status = "WARNING";
        }


        messages.push(
            "High temperature"
        );

    }



    // Heart rate

    if(
        data.heartRate < 60 ||
        data.heartRate > 120
    )
    {

        if(status !== "DANGER")
        {
            status = "WARNING";
        }


        messages.push(
            "Abnormal heart rate"
        );

    }



    // Update UI


    if(status === "SAFE")
    {

        safetyStatus.innerHTML =
        "🟢 SAFE";


        safetyStatus.className =
        "text-success";


        safetyMessage.innerHTML =
        "Worker monitoring normal";

    }



    else if(status === "WARNING")
    {

        safetyStatus.innerHTML =
        "🟡 WARNING";


        safetyStatus.className =
        "text-warning";


        safetyMessage.innerHTML =
        messages.join(", ");

    }



    else
    {

        safetyStatus.innerHTML =
        "🚨 DANGER";


        safetyStatus.className =
        "text-danger";


        safetyMessage.innerHTML =
        messages.join(", ");

    }


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

document.querySelectorAll(".sensor-card")
.forEach(card=>{
    card.classList.remove("loading");
});

    updateSafetyStatus(data);

    lastSensorUpdate =
new Date();

 

updateSensorStatus(data);


document.getElementById(
"lastUpdated"
).innerHTML =
lastSensorUpdate.toLocaleString();


updateConnectionStatus();



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




popup.style.display = "block";

popup.classList.add("show");

alertAudio.play()
.then(()=>{
    alertPlaying = true;
});





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

popup.classList.remove("show");

setTimeout(() => {
    popup.classList.remove("show");

setTimeout(() => {
    popup.style.display = "none";
},400);
}, 300);

}


}

// =================================
// LIVE ALERT COUNTER
// =================================


// =================================
// LIVE NEW ALERT COUNTER
// =================================

const alertCounter =
firebase.database().ref("alerts");

alertCounter.on("value", (snapshot) => {

    let count = 0;

    if (snapshot.exists()) {

        snapshot.forEach((child) => {

            let alert = child.val();

            if (alert.status === "NEW") {

                count++;

            }

        });

    }

    const counter =
    document.getElementById("alertCount");

    if (counter) {

        counter.innerText = count;

        // Hide badge when no alerts
        if (count === 0) {

            counter.style.display = "none";

        } else {

            counter.style.display = "inline-block";

        }

    }

});


setInterval(
updateConnectionStatus,
5000
);


// =================================
// MOBILE SIDEBAR
// =================================
function toggleSidebar(){

    const sidebar = document.getElementById("sidebar");

    sidebar.classList.toggle("show");

}


