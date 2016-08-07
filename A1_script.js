var app = angular.module("app", ["leaflet-directive"]);

app.controller('MapController', ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
  var ratIcon = L.icon({
    iconUrl: 'http://andywoodruff.com/maptime-leaflet/rat.png',
    iconSize: [60,50]
  });

  angular.extend($scope, {
    london: {
      lat: 51.505,
      lng: -0.09,
      zoom: 8
    },
    pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: ratIcon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
        return marker;
    }
  });

  $http.get("A1_test.geojson").success(function(data, status) {
    angular.extend($scope, {
	    geojson: {
	     	pointToLayer: function(feature,latlng){
		  	  return L.marker(latlng,{icon: leafIcon});
			  },
	      data: addGeoJsonLayerWithClustering(data)
		  }
		});
  });

  function addGeoJsonLayerWithClustering(data) {
      var markers = L.markerClusterGroup();
      var geoJsonLayer = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.name);
          }
      });
      markers.addLayer(geoJsonLayer);
      leafletData.getMap().then(function(map) {
        map.addLayer(markers);
        //map.fitBounds(markers.getBounds());
      });
  }

}]);
