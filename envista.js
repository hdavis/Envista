'use strict';

var initLat = 38;
var initLong = -98;
var initZoomLevel = 4;
var zoommax = 18;

var map = L.map('map');

// BASEMAPS
// Additional basemaps @ https://leaflet-extras.github.io/leaflet-providers/preview/

// OpenStreetMap Black and White basemap
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
maxZoom: zoommax,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
map.addLayer(OpenStreetMap_BlackAndWhite);


// Open Map Surfer Roads Basemap
var OpenMapSurfer_Roads = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
maxZoom: zoommax,
attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
//map.addLayer(OpenMapSurfer_Roads);


// OVERLAYS

// Add maximum temperature data
//        var envista_proj = new L.geoJson();
//        envista_proj.addTo(map);
//
//        $.ajax({
//        dataType: "json",
//        url: "https://data.sfgov.org/resource/dsie-4zfb.geojson",
//        success: function(data) {
//            $(data.features).each(function(key, data) {
//            envista_proj.addData(data);
//            });
//        }
//        }).error(function() {});

///===========
var smallIcon = new L.Icon({
    iconUrl: 'icons/pin-1_dk_blue.svg', // was using 'icons/placeholder-29.svg'
    iconRetinaUrl: 'icons/pin-1_dk_blue.svg',
    iconSize:    [34, 34], // size of the icon
    iconAnchor:  [12, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [4, -30], // point from which the popup should open relative to the iconAnchor
//    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//    shadowSize:  [41, 41], // size of the shadow
//    shadowAnchor: [7, 37],  // point of the shadow which will correspond to shadow's location
});

function onEachFeature(feature, layer) {
    console.log(feature);
    var popupText = "<strong>Envista Construction Project</strong>"
                + "<br>Project Status: " + feature.properties.project_status
                + "<br>Project Class: " + feature.properties.dwp_project_class
                + "<br>Owner: " + feature.properties.owner
                + "<br>Project ID: " + feature.properties.project_id
                + "<br>Start Date: " + feature.properties.start_date
                + "<br>End Date: " + feature.properties.end_date;
    layer.bindPopup(popupText);
}

var envista_proj = new L.geoJson(null, {
    pointToLayer: function(feature, latlng) {
        //console.log(latlng, feature);
        return L.marker(latlng, {
          icon: smallIcon
        });
      },
      onEachFeature: onEachFeature
});

//var markers = L.markerClusterGroup();
//markers.addLayer(envista_proj);
//map.addLayer(markers);

//envista_proj.addTo(map);

//var clusters = L.MarkerClusterGroup();
////clusters.addLayers(envista_proj);
//clusters.addLayer(envista_proj);
//map.addLayer(clusters);


$.ajax({
    dataType: "json",
//    url: "https://data.sfgov.org/resource/dsie-4zfb.geojson",
    url: "envista.geojson",
    success: function(data) {
        $(data.features).each(function(key, data) { 
            envista_proj.addData(data);
        });
        
    }
}).error(function() {});
  
//envista_proj.addLayer();

var markers = L.markerClusterGroup();
markers.addLayer(envista_proj);
map.addLayer(markers);


////////-------------

// Define and display the control for Basemaps and Overlays
var baseLayers = {
    "Open Street Map - B&W": OpenStreetMap_BlackAndWhite,
    "Open Map Surfer Roads": OpenMapSurfer_Roads
};
var overlays = {
    "Construction Projects": envista_proj,
};
L.control.layers(baseLayers, overlays).addTo(map);

map.setView([37.759313, -122.441815], 13);
