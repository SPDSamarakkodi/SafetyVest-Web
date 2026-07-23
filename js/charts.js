// =================================
// SENSOR HISTORY CHARTS
// =================================


// Data arrays

let labels = [];

let temperatureData = [];

let gasData = [];

let heartData = [];

let humidityData = [];




// ================================
// Temperature Chart
// ================================


const temperatureChart = new Chart(

document.getElementById("temperatureChart"),

{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Temperature °C",

data:temperatureData,

borderWidth:2,

tension:0.3

}

]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

}

}

}

);






// ================================
// Gas Chart
// ================================


const gasChart = new Chart(

document.getElementById("gasChart"),

{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Gas PPM",

data:gasData,

borderWidth:2,

tension:0.3

}

]

},

options:{

responsive:true

}

}

);






// ================================
// Heart Chart
// ================================


const heartChart = new Chart(

document.getElementById("heartChart"),

{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Heart BPM",

data:heartData,

borderWidth:2,

tension:0.3

}

]

},

options:{

responsive:true

}

}

);


// ================================
// Humidity Chart
// ================================


const humidityChart = new Chart(

document.getElementById("humidityChart"),

{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Humidity %",

data:humidityData,

borderWidth:2,

tension:0.3

}

]

},

options:{

responsive:true

}

}

);




// ================================
// Firebase History
// ================================


database
.ref("history")
.limitToLast(30)

.on("value",(snapshot)=>{


console.log(
"Updating Charts..."
);



labels.length=0;

temperatureData.length=0;

gasData.length=0;

heartData.length=0;

humidityData.length=0;


snapshot.forEach((child)=>{


let data =
child.val();



let time =
new Date(
data.timestamp
)
.toLocaleTimeString();



labels.push(time);



temperatureData.push(
parseFloat(data.temperature)
);



gasData.push(
parseFloat(data.gas)
);



heartData.push(
parseFloat(data.heartRate)
);

humidityData.push(
parseFloat(data.humidity)
);

});



console.log(
labels
);

console.log(
temperatureData
);




// IMPORTANT PART

temperatureChart.data.labels =
labels;


temperatureChart.data.datasets[0].data =
temperatureData;



gasChart.data.labels =
labels;


gasChart.data.datasets[0].data =
gasData;



heartChart.data.labels =
labels;


heartChart.data.datasets[0].data =
heartData;


humidityChart.data.labels =
labels;


humidityChart.data.datasets[0].data =
humidityData;


temperatureChart.update();

gasChart.update();

heartChart.update();

humidityChart.update();

});
