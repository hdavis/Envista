var app = angular.module("app", ["leaflet-directive"]);

app.controller('MapController', ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
  var smallIcon = new L.Icon({
      iconUrl: 'icons/pin-1_dk_blue.svg', // was using 'icons/placeholder-29.svg'
      iconRetinaUrl: 'icons/pin-1_dk_blue.svg',
      iconSize:    [34, 34], // size of the icon
      iconAnchor:  [6, 30], // 12, 30, point of the icon which will correspond to marker's location
      popupAnchor: [4, -30], // point from which the popup should open relative to the iconAnchor
  });

  var initLat = 37.759313;
  var initLong = -122.441815;
  var initZoomLevel = 12;
  var zoommax = 18;

  angular.extend($scope, {
    SanFrancisco: {
      lat: initLat,
      lng: initLong,
      zoom: initZoomLevel
    },
    // pointToLayer: function(feature,latlng){
    //     var marker = L.marker(latlng,{icon: ratIcon});
    //     marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
    //     return marker;
    // }
  });

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
   var popupText = "<strong>Envista Construction Project</strong>"
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
