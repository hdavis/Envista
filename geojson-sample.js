var geojsonSample = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.0, 0.5]
			},
			"properties": {
				"prop0": "value0",
				"color": "blue"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.01, 0.51]
			},
			"properties": {
				"prop0": "value0",
				"color": "black"
			}
		},
        {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.0, 0.52]
			},
			"properties": {
				"prop0": "value0",
				"color": "purple"
			}
		},
        {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.01, 0.53]
			},
			"properties": {
				"prop0": "value0",
				"color": "red"
			}
		},
        {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.0, 0.54]
			},
			"properties": {
				"prop0": "value0",
				"color": "green"
			}
		},
        {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.01, 0.55]
			},
			"properties": {
				"prop0": "value0",
				"color": "yellow"
			}
		},
        
        {
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]
			},
			"properties": {
				"color": "red",
				"prop1": 0.0
			}
		},

		{
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]
			},
			"properties": {
				"color": "green",
				"prop1": {
					"this": "that"
				}
			}
		},

		{
			"type": "Feature",
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [[[[100.0, 1.5], [100.5, 1.5], [100.5, 2.0], [100.0, 2.0], [100.0, 1.5]]], [[[100.5, 2.0], [100.5, 2.5], [101.0, 2.5], [101.0, 2.0], [100.5, 2.0]]]]
			},
			"properties": {
				"color": "purple"
			}
		}
	]
};
//Contact GitHub API Training Shop Blog About
//© 2016 GitHub, Inc. Terms Privacy Security Status Help