var app = angular.module("app", ["leaflet-directive"]);

//var myApp = angular.module('myApp', ['ngRoute', 'leaflet-directive']);

app.controller('MapController', ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
  var smallIcon = new L.Icon({
      iconUrl: 'icons/pin-1_dk_blue.svg', // was using 'icons/placeholder-29.svg'
      iconRetinaUrl: 'icons/pin-1_dk_blue.svg',
      iconSize:    [34, 34], // size of the icon
      iconAnchor:  [18, 32], // 12, 30, point of the icon which will correspond to marker's location
      popupAnchor: [4, -30], // point from which the popup should open relative to the iconAnchor
  });

  var initLat = 37.759313;
  var initLong = -122.441815;
  var initZoomLevel = 12;
  var zoommax = 18;
//=====================
  var map = L.map('map');

  // BASEMAPS
  // Additional basemaps @ https://leaflet-extras.github.io/leaflet-providers/preview/

  // OpenStreetMap Black and White basemap
  var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: zoommax,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  map.addLayer(OpenStreetMap_BlackAndWhite);

  // var MapBox = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  // 	attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // 	subdomains: 'abcd',
  // 	id: '<your id>',
  // 	accessToken: '<your accessToken>'
  // });

  // var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  // 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  // 	subdomains: 'abcd',
  // 	maxZoom: 19
  // });

  // var OpenMapSurfer_Grayscale = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
  // 	maxZoom: 19,
  // 	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // });



// //----------------------
// geojson.options = {
//                style: geojson.style,
//                filter: geojson.filter,
//                onEachFeature: onEachFeature,
//                pointToLayer: geojson.pointToLayer
//              };
//              leafletGeoJSON = L.geoJson(geojson.data, geojson.options);
// //
// // changed to
// //
// leafletGeoJSON = L.geoJson(geojson.data, {
//                 style: geojson.style,
//                 filter: geojson.filter,
//                 onEachFeature: onEachFeature,
//                 pointToLayer: function (feature, latlng) {
//                 return L.circleMarker(latlng);
//               }
//               });
// //----------------------







/// TURNED THIS OFF WHEN ADDED MAP LAYERS AND SETVIEW AT BOTTOM
  // angular.extend($scope, {
  //   SanFrancisco: {
  //     lat: initLat,
  //     lng: initLong,
  //     zoom: initZoomLevel
  //   },
  //   // pointToLayer: function(feature,latlng){
  //   //     var marker = L.marker(latlng,{icon: ratIcon});
  //   //     marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
  //   //     return marker;
  //   // }
  // });

  //$http.get("envista.geojson").success(function(data, status) {
  //$http.get("https://data.sfgov.org/resource/vad7-rtjc.geojson").success(function(data, status) { // smaller dataset
  $http.get("https://data.sfgov.org/resource/dsie-4zfb.geojson").success(function(data, status) {
    angular.extend($scope, {
	    geojson: {
        // pointToLayer: function(feature,latlng){
		  	//   return L.marker(latlng,{icon: smallIcon});
			  // },
	      data: addGeoJsonLayerWithClustering(data)
		  }
		});
  });


function onEachFeature(feature, layer) {
   //console.log(feature);
   var popupText = "<strong>Construction Project</strong>"
               + "<br>Project Status: " + feature.properties.project_status
               + "<br>Project Class: " + feature.properties.dpw_project_class
               + "<br>Owner: " + feature.properties.owner
               + "<br>Project ID: " + feature.properties.project_id
               + "<br>Start Date: " + feature.properties.start_date
               + "<br>End Date: " + feature.properties.end_date;
    //var popupText = feature.properties.name;
   layer.bindPopup(popupText);
}

  function addGeoJsonLayerWithClustering(data) {
      var markers = L.markerClusterGroup();
      var geoJsonLayer = L.geoJson(data, {
          // onEachFeature: function (feature, layer) {
          //     layer.bindPopup(feature.properties.name);
          // }
          pointToLayer: function(feature, latlng) {
             //console.log(latlng, feature);
             return L.marker(latlng, {
               icon: smallIcon
             });
           },
           onEachFeature: onEachFeature
      });
      markers.addLayer(geoJsonLayer);
      leafletData.getMap().then(function(map) {
        map.addLayer(markers);
        //map.fitBounds(markers.getBounds());
      });
  }

}]);

// //mapoptions
// myApp.controller("GoogleMapsController", ["$scope",
//     function($scope) {
//         angular.extend($scope, {
//             world: {
//                 lat: 15.52,
//                 lng: 10.40,
//                 zoom: 2
//             },
//             scrollwheel: false,
//             layers: {
//                 baselayers: {
//                     googleTerrain: {
//                         name: 'Google Terrain',
//                         layerType: 'TERRAIN',
//                         type: 'google'
//                     }
//
//
//                 }
//             },
//             defaults: {
//                 scrollwheel: false
//             }
//         });
//     }
// ]);

map.setView([initLat, initLong], initZoomLevel);
