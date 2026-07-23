let historyData=[];



database
.ref("history")
.limitToLast(100)

.on(
"value",
(snapshot)=>{


historyData=[];


let table =
document.getElementById(
"historyTable"
);



table.innerHTML="";



snapshot.forEach((child) => {
    historyData.push(child.val());
});

historyData.reverse();

historyData.forEach((item) => {
    addRow(item);
});


});





function addRow(data){


let table =
document.getElementById(
"historyTable"
);



let time = new Date(data.timestamp * 1000).toLocaleString(
    "en-LK",
    {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }
);



let fall =
data.fall
?
"🚨 YES"
:
"✅ NO";



let row = `


<tr>


<td>${time}</td>


<td>${data.temperature} °C</td>


<td>${data.humidity} %</td>


<td>${data.gas}</td>


<td>${data.heartRate} BPM</td>


<td>${fall}</td>


<td>

${data.latitude},

${data.longitude}


</td>


</tr>


`;



table.innerHTML += row;


}






function searchHistory(){


let value =
document
.getElementById("search")
.value
.toLowerCase();



let table =
document.getElementById(
"historyTable"
);



table.innerHTML="";



historyData
.filter(item=>{


return JSON.stringify(item)
.toLowerCase()
.includes(value);



})
.forEach(item=>{


addRow(item);


});


}
