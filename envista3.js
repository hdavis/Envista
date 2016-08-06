'use strict';

var initLat = 0.78;
var initLong = 102.37;
var initZoomLevel = 7;

//var initLat = 37.759313;
//var initLong = -122.441815;
//var initZoomLevel = 13;
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

//function onEachFeature(feature, layer) {
//    console.log(feature);
//    var popupText = "<strong>Envista Construction Project</strong>"
//                + "<br>Project Status: " + feature.properties.project_status
//                + "<br>Project Class: " + feature.properties.dpw_project_class
//                + "<br>Owner: " + feature.properties.owner
//                + "<br>Project ID: " + feature.properties.project_id
//                + "<br>Start Date: " + feature.properties.start_date
//                + "<br>End Date: " + feature.properties.end_date;
//    layer.bindPopup(popupText);
//}
//
//var envista_proj = new L.geoJson(null, {
//    pointToLayer: function(feature, latlng) {
//        console.log(latlng, feature);
//        return L.marker(latlng, {
//          icon: smallIcon
//        });
//      },
//      onEachFeature: onEachFeature
//});
////envista_proj.addTo(map);

// Original .ajax code
//$.ajax({
//    dataType: "json",
////    url: "https://data.sfgov.org/resource/dsie-4zfb.geojson",
//    //url: "https://data.sfgov.org/resource/vad7-rtjc.geojson", // smaller dataset
//    url: "envista.geojson",
//    success: function(data) {
//        $(data.features).each(function(key, data) {
//            envista_proj.addData(data);
//        });
//
//    }
//}).error(function() {});

///////////
var geojson = L.geoJson(null, {
    style: function (feature) {
        return {color: feature.properties.color};
    },
    onEachFeature: function (feature, layer) {
        var popupText = 'geometry type: ' + feature.geometry.type;
        if (feature.properties.color) {
            popupText += '<br/>color: ' + feature.properties.color;
        }
        layer.bindPopup(popupText);
    }
});
//////////////

$.ajax({
    dataType: "json",
//    url: "https://data.sfgov.org/resource/dsie-4zfb.geojson",
    //url: "https://data.sfgov.org/resource/vad7-rtjc.geojson", // smaller dataset
    url: "sample.geojson",
    success: function(data) {
        $(data.features).each(function(key, data) {
            geojson.addData(data);
        });

    }
}).error(function() {});

//var markers = L.markerClusterGroup();
//markers.addLayer(envista_proj);
//map.addLayer(markers);


////////// THIS IS WHERE THE CODE WORKED ON THE EXAMPLE DATA
var markers = L.markerClusterGroup();

// markers.addLayer(geojson);
// map.addLayer(markers);

////////-------------

geojson.on('data:loaded', function () {
    markers.addLayer(geojson);
    console.log(markers);
    map.addLayer(markers);
}

// barLayer.on('data:loaded', function () {
//     markers.addLayer(barLayer);
//     console.log(markersBar);
//     map.addLayer(markersBar);
// }

// Define and display the control for Basemaps and Overlays
var baseLayers = {
    "Open Street Map - B&W": OpenStreetMap_BlackAndWhite,
    "Open Map Surfer Roads": OpenMapSurfer_Roads
};
var overlays = {
    //"Construction Projects": envista_proj,
    "Construction Projects": geojson,
    //"Construction Projects": markers,
};
L.control.layers(baseLayers, overlays).addTo(map);


//var markers = L.markerClusterGroup();
//markers.addLayer(geojson);
//map.addLayer(markers);

//var markers = L.markerClusterGroup();
//markers.addLayer(envista_proj);
//map.addLayer(markers);

map.setView([initLat, initLong], initZoomLevel);

//var markers = L.markerClusterGroup();
//markers.addLayer(envista_proj);
//map.addLayer(markers);



//markers.addTo(map);
