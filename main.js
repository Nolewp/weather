var curLocation = [0,0];

if (curLocation[0] == 0 && curLocation[1] == 0) {
    curLocation = [27.961097996917612, -82.49310733133689];
    }

var map = L.map('map').setView(curLocation, 10);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.attributionControl.setPrefix(false);

var marker = new L.marker(curLocation, {
    draggable: 'true'
})

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
    var keyopen = 'c1a4ddae9a9e027abb94a73bc9db6646'
    var lat = ($("#Latitude").val());
    var lon = ($("#Longitude").val());
    console.log(lat, lon);
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+keyopen)
      .then(response => {
          return response.json();
      })
      .then(json => {
        console.log(json)
        var name = json["name"]
        var temp = Number(((json["main"]['temp'] - 273.15) * 1.8) + 32).toFixed(2)
        // var temp = temps
        console.log(temp)
        document.getElementById('name').innerText = name
        document.getElementById('temp').innerText = temp
      })

      .catch(err => {
        console.error(err);
        console.log('Something went wrong!')
        alert('Something went wrong, try dragging the  pin to a new location you would like to know the temperature of within longitude -180 and 180 degrees');
      });

    })