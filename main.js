var curLocation = [0,0];

if (curLocation[0] == 0 && curLocation[1] == 0) {
    curLocation = [27.961097996917612, -82.49310733133689];
    }

var map = L.map('map').setView(curLocation, 10);


var corner1 = L.latLng(90, -180)
var corner2 = L.latLng(-90, 180)
bounds = L.latLngBounds(corner1, corner2);


//cerate map

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,

    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.attributionControl.setPrefix(false);

var marker = new L.marker(curLocation, {
    draggable: 'true'
})

//gathers lat lng populates weather form 
function populateForm(){
    console.log('populating weather form')
    var position = marker.getLatLng();
    console.log(position)
    marker.setLatLng(position, {
    draggable: 'true'
    }).bindPopup(position).update();
    document.querySelector('#Latitude').value = position.lat
    document.querySelector('#Longitude').value = position.lng

    checkMarkerinFrame(position);
}

function checkMarkerinFrame(position){
    if (!map.getBounds().contains(position)){
        map.setView(position)
    }
};


function submitForm() { 
    document.getElementById('submit').click();
}



document.querySelector('#Latitude','#Longitude' ).addEventListener("change", (e) => {
    var position = [parseInt(document.querySelector('#Latitude').value), parseInt(document.querySelector('#Longitude').value)];
    marker.setLatLng(position, {
    draggable: 'true'
    }).bindPopup(position).update();
    map.panTo(position);
});

function onLocationFound(e) {
    if (e.accuracy > 100){
        onLocationError(e);
    }
    else {
        marker.setLatLng(e.latlng);
        populateForm();
        submitForm();
    }
}

function onLocationError(e) {
    console.log("Cant locate or out of tollerance");
}


document.querySelector('#submit').addEventListener("click", (e) => {
    var keyopen = 'c1a4ddae9a9e027abb94a73bc9db6646'
    var lat = document.querySelector('#Latitude').value
    var lon = document.querySelector('#Longitude').value
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+keyopen)
      .then(response => {
          return response.json();
      })
      .then(json => {
        var name = json["name"]
        var temp = String(Number(((json["main"]['temp'] - 273.15) * 1.8) + 32).toFixed(2))
        var cloud = json["weather"][0]['description']
        var photoCode = 'https://openweathermap.org/img/wn/' + json["weather"][0]['icon'] + '.png'
        
        
        document.getElementById('name').innerText = name
        document.getElementById('temp').innerText = temp + '\u00B0 F'
        document.getElementById('cloud').innerText = (' ' + cloud)
        document.getElementById('icon').src = photoCode
        document.getElementById('icon').style = "border-radius: 5px; background-color: rgb(187, 178, 178);"
      })

      .catch(err => {
        console.error(err);
        console.log('Something went wrong!')
        alert('Something went wrong, try dragging the  pin to a new location you would like to know the temperature of within longitude -180 and 180 degrees');
      });

    })

    
map.addLayer(marker);
map.locate({setView: true, maxZoom: 16});
map.on('locationerror', onLocationError);
marker.on('dragend', populateForm);
map.on('locationfound', onLocationFound);