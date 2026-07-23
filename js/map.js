// =================================
// LIVE GPS MAP
// =================================


// Default location

let map =
L.map("map")
.setView(
[6.819835,79.875325],
16
);




// OpenStreetMap Layer


L.tileLayer(
"https://tile.openstreetmap.org/{z}/{x}/{y}.png",
{

maxZoom:19,

}
)
.addTo(map);




// Worker Marker


let workerMarker =
L.marker(
[6.819835,79.875325]
)
.addTo(map);



workerMarker.bindPopup(
"🦺 Worker Location"
);





// Firebase GPS


const gpsRef =
database.ref("gps");



gpsRef.on(
"value",
(snapshot)=>{


let gps =
snapshot.val();



if(!gps)
return;



let lat =
parseFloat(
gps.latitude
);



let lng =
parseFloat(
gps.longitude
);




console.log(
"GPS:",
lat,
lng
);




// Move marker


workerMarker
.setLatLng(
[
lat,
lng
]
);




// Move map


map.panTo(
[
lat,
lng
]
);



}

);
