# Envista Mapping App Project

The goal of the Envista Mapping App is to map the City of San Francisco's Envista construction projects using data from the City's [Open Data portal] (https://data.sfgov.org/).

### To View the Map
To view the map, visit [this page] (https://hdavis.github.io/Envista/envista.html).  

This map uses a clustering algorithm which shows a single symbol (an orange, yellow or green circle) to represent multiple data points (a.k.a. markers).  The number inside the circle tells how many data points/markers the circle represents.  If you zoom in or click on one of the circles, the map will expand to show more circles and markers.  

To access information on a single construction project, click on the colored marker for that project and a popup will display showing pertinent details.  

### The marker colors denote the project's status:
  - Red = Started
  - Dark Blue = Committed
  - Purple = Planned
  - Cyan = Completed

# Future Improvements
- Since the map takes a few seconds to load, add a spinning animation during this loading period.
- Consider using a base map that is visually simpler; perhaps a dark map (like Mapbox's dark base map) or a light, grey-scale map (OpenStreetMap Black and White, CartoDB, etc.)
- Possibly add a data viewing panel on the right side of the map similar to how the [LA Street Wize] (http://streetwize.lacity.org/) site displays data as opposed to the current popups when a user clicks on a point in the map.
- Improve overall site layout, possibly adopt a similar layout to the LA Street Wise site.
-  Provide more ways to look at the data by allowing users to:
  - Query on a given time period and/or make it clearer which projects have started (red markers), which are upcoming (blue and purple markers) and which have been completed (cyan markers)
  - See the data by project class (gas, sewer, water, electric, transit, pedestrian safety, storm drain, etc. )
  - See the data by project owner (PG&E, SF Public Utilities Commission, SF Municipal Transportation Agency, AT&T, etc.)
  - Query by address
