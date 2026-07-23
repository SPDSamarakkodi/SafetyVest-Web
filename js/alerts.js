// ======================================
// SMART SAFETY VEST ALERT HISTORY
// ======================================



const alertRef =
firebase.database()
.ref("alerts");





alertRef.on(
"value",
(snapshot)=>{


let data =
snapshot.val();



let container =
document.getElementById(
"alertContainer"
);



container.innerHTML="";



if(!data)
{


container.innerHTML=`

<div class="alert alert-success">

✅ No alerts available

</div>

`;

return;


}






Object.entries(data)
.reverse()
.forEach(
([id,alert])=>{


let type =
alert.type ?? "Unknown";


let message =
alert.message ?? "No message";


let gas =
alert.gas ?? 0;


let heart =
alert.heartRate ?? 0;


let latitude =
alert.latitude ?? 0;


let longitude =
alert.longitude ?? 0;




let time =
alert.timestamp
?
new Date(
alert.timestamp * 1000
)
.toLocaleString()

:
"Unknown";




container.innerHTML += `



<div class="card border-danger mb-3 shadow">


<div class="card-body">


<h5 class="text-danger">

🚨 ${type}

</h5>



<p>
${message}
</p>



<p>

💨 Gas:

<b>
${gas}
</b>

</p>




<p>

❤️ Heart Rate:

<b>
${heart}
</b>

BPM

</p>




<p>

🕒 Time:

${time}

</p>



<p>

Status:

<b>

${alert.status ?? "NEW"}

</b>

</p>




<a

target="_blank"

class="btn btn-primary mb-2"

href="https://maps.google.com/?q=${latitude},${longitude}"

>

📍 View Location

</a>





<button

class="btn btn-success"

onclick="acknowledgeAlert('${id}')"

>

✅ Acknowledge

</button>



</div>


</div>



`;



});



});







// =================================
// ACKNOWLEDGE ALERT
// =================================


function acknowledgeAlert(id)
{


firebase.database()

.ref(
"alerts/"+id
)

.update({

status:"CHECKED"

})

.then(()=>{


console.log(
"Alert CHECKED"
);


})

.catch(error=>{


console.log(
error
);


});


}