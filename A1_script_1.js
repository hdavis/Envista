var app = angular.module("app", ["leaflet-directive"]);

app.controller('MapController', ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
  // var ratIcon = L.icon({
  //   iconUrl: 'http://andywoodruff.com/maptime-leaflet/rat.png',
  //   iconSize: [60,50]
  // });
  var smallIcon = new L.Icon({
      iconUrl: 'icons/pin-1_dk_blue.svg', // was using 'icons/placeholder-29.svg'
      iconRetinaUrl: 'icons/pin-1_dk_blue.svg',
      iconSize:    [34, 34], // size of the icon
      iconAnchor:  [12, 30], // point of the icon which will correspond to marker's location
      popupAnchor: [4, -30], // point from which the popup should open relative to the iconAnchor
  });

  angular.extend($scope, {
    london: {
      lat: 51.505,
      lng: -0.09,
      zoom: 8
    },
    // pointToLayer: function(feature,latlng){
    //     var marker = L.marker(latlng,{icon: ratIcon});
    //     marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
    //     return marker;
    // }
  });

  $http.get("A1_test.geojson").success(function(data, status) {
    angular.extend($scope, {
	    geojson: {
        // pointToLayer: function(feature,latlng){
		  	//   return L.marker(latlng,{icon: smallIcon});
			  // },
	      data: addGeoJsonLayerWithClustering(data)
		  }
		});
  });

/// Putting new code here:
var initLat = 37.759313;
var initLong = -122.441815;
var initZoomLevel = 13;
var zoommax = 18;

// BASEMAPS

// OVERLAYS

function onEachFeature(feature, layer) {
   console.log(feature);
  //  var popupText = "<strong>Envista Construction Project</strong>"
  //              + "<br>Project Status: " + feature.properties.project_status
  //              + "<br>Project Class: " + feature.properties.dpw_project_class
  //              + "<br>Owner: " + feature.properties.owner
  //              + "<br>Project ID: " + feature.properties.project_id
  //              + "<br>Start Date: " + feature.properties.start_date
  //              + "<br>End Date: " + feature.properties.end_date;
    var popupText = feature.properties.name;
   layer.bindPopup(popupText);
}

///

  function addGeoJsonLayerWithClustering(data) {
      var markers = L.markerClusterGroup();
      var geoJsonLayer = L.geoJson(data, {
          // onEachFeature: function (feature, layer) {
          //     layer.bindPopup(feature.properties.name);
          // }
          pointToLayer: function(feature, latlng) {
             console.log(latlng, feature);
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
