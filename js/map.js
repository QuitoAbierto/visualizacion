var myMap = L.map('my-map').setView([-0.1828190562356577, -78.48433256149292], 15);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}

var stopIcon = L.icon({
    iconUrl: 'images/bus.png',
    iconRetinaUrl: 'images/bus-2x.png',
    iconSize: [20, 20]
});

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  icon: stopIcon
};

function successHandler(data) {
  var features = data.map(function(stop) {
    if (stop.geoJSON) {
      stop.geoJSON.geometry.coordinates = [stop.location.lng, stop.location.lat];
      return stop.geoJSON;
    }
  });
  L.geoJson(features, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, geojsonMarkerOptions);
    }
  }).addTo(myMap);
}
$.ajax({
  url: 'http://test.quitoabierto.org:5000/api/parada',
  dataType: 'json',
  method: 'GET',
  success: successHandler,
  error: function error() {
    console.log('Error accessing the API');
  }
});
