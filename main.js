var curLocation = [0,0];

if (curLocation[0] == 0 && curLocation[1] == 0) {
    curLocation = [27.785111866557727, 277.32339352369314];
    }

var map = L.map('map').setView(curLocation, 13);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.attributionControl.setPrefix(false);

var marker = new L.marker(curLocation, {
    draggable: 'true'
});

marker.on('dragend', function(event) {
    var position = marker.getLatLng();
    marker.setLatLng(position, {
    draggable: 'true'
    }).bindPopup(position).update();
    $("#Latitude").val(position.lat);
    $("#Longitude").val(position.lng).keyup();
});

$("#Latitude, #Longitude").change(function() {
    var position = [parseInt($("#Latitude").val()), parseInt($("#Longitude").val())];
    marker.setLatLng(position, {
    draggable: 'true'
    }).bindPopup(position).update();
    map.panTo(position);
});


map.addLayer(marker);

$('#submit').click(function(){

    var lat = parseInt($("#Latitude").val());
    var lats = String(lat);
    var lon = parseInt($("#Longitude").val());
    var lons = String(lon);
    console.log(lats, lons)
    // fetch('https://api.openweathermap.org/data/2.5/weather?lat={'+lats+'}&lon={'+lons+'}&appid={'+key+'}')
    // fetch('http://api.weatherapi.com/v1/q='+lat+','+lon+'current.json/', 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat={'+lats+'}&lon={'+lons+'}&appid={'+key+'}', {
        "method": "GET",
        "headers": {
        }
        })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
      



// var myKey = config.key


// var button = document.querySelector('.button')
// var inputValue = document.querySelector('.inputValue')
// // var lat = ($("#Latitude").val())
// // var lon = ($("#Longitude").val())

    })