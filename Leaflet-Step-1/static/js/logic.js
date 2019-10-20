//var APIKEY = "pk.eyJ1IjoiY2FtYmVybzc4IiwiYSI6ImNrMDlta2xhcTBhZm8zaHBscmNkanBhMGsifQ._HCQAbbbXZxidVrwOCc9uQ";
var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
 attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
 maxZoom: 18,
 id: "mapbox.streets",
 accessToken: API_KEY
});
// create the map
var map = L.map("mapid", {
 center: [
   40.7, -94.5
 ],
 zoom: 3
});
graymap.addTo(map);
// Call geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {
 function styleInfo(feature) {
   return {
     opacity: 1,
     fillOpacity: 1,
     fillColor: getColor(feature.properties.mag),
     color: "#000015",
     radius: getRadius(feature.properties.mag),
     stroke: true,
     weight: 0.5
   };
 }
 //marker color based on the magnitude of the earthquake.
 function getColor(magnitude) {
   switch (true) {
   case magnitude > 5:
     return "#8B0000";
   case magnitude > 4:
     return "#00008B";
   case magnitude > 3:
     return "#B8860B";
   case magnitude > 2:
     return "#eecc00";
   case magnitude > 1:
     return "#00FFFF";
   default:
     return "#98ee00";
   }
 }
   function getRadius(magnitude) {
   if (magnitude === 0) {
     return 1;
   }
   return magnitude * 4;
 }
 // Here we add a GeoJSON layer to the map once the file is loaded.
 L.geoJson(data, {
   // We turn each feature into a circleMarker on the map.
   pointToLayer: function(feature, latlng) {
     return L.circleMarker(latlng);
   },
   // We set the style for each circleMarker using our styleInfo function.
   style: styleInfo,
   // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
   onEachFeature: function(feature, layer) {
     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
   }
 }).addTo(map);
 // Here we create a legend control object.
 var legend = L.control({
   position: "bottomright"
 });
 // Then add all the details for the legend
 legend.onAdd = function() {
   var div = L.DomUtil.create("div", "info legend");
   var grades = [0, 1, 2, 3, 4, 5];
   var colors = [
     "#00FFFF",
     "#d4ee00",
     "#B8860B",
     "#ee9c00",
     "#00008B",
     "#8B0000"
   ];
   // Looping to generate label
   for (var i = 0; i < grades.length; i++) {
     div.innerHTML +=
       "<i style='background: " + colors[i] + "'></i> " +
       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
   }
   return div;
 };
 //legend to map.
 legend.addTo(map);
});

 
