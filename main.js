var curLocation = [0,0];

if (curLocation[0] == 0 && curLocation[1] == 0) {
    curLocation = [27.961097996917612, -82.49310733133689];
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
    console.log(lats, lons);
    // fetch('https://api.openweathermap.org/data/2.5/weather?lat={'+lats+'}&lon={'+lons+'}&appid={'+keyopen+'}')
    // fetch('http://api.weatherapi.com/v1/current.json?key='+key+'&q='+lon+','+lat)
    // fetch('https://api.openweathermap.org/data/2.5/weather?lat={'+lats+'}&lon={'+lons+'}&appid={'+key+'}'
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lats+'&lon='+lons+'&appid='+keyopen)
      .then(response => response.json())
      .then(data  => console.log(data))
      .catch(err => {
        console.error(err);
        console.log('no go');
      });


map.on('click', function(e){
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
  });

    })