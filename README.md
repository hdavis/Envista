# Envista Mapping App Project

The goal of the Envista Mapping App is to map the City of San Francisco's Envista construction projects using data from the City's [Open Data portal] (https://data.sfgov.org/).

To view the map, visit [this page] (https://hdavis.github.io/Envista/envista.html).

# Future Improvements
- Since the map takes a few seconds to load, add a spinning animation during this loading period.
- Consider using a base map that is visually simpler; perhaps a dark map (like Mapbox's dark base map) or a light, grey-scale map (OpenStreetMap Black and White, CartoDB, etc.)
- Possibly add a data viewing panel on the right side of the map similar to how the [LA Street Wize] (http://streetwize.lacity.org/) site displays data as opposed to the current popups when a user clicks on a point in the map.
- Improve overall site layout, possibly adopt a similar layout to the LA Street Wise site.
-  Provide more ways to look at the data by allowing users to:
  - query on a given time period and/or make it clearer which projects have started (red markers), which are upcoming (blue and purple markers) and which have been completed (cyan markers)
  - see the data by project class (gas, sewer, water, electric, transit, pedestrian safety, storm drain, etc. )
  - see the data by project owner (PG&E, SF Public Utilities Commission, SF Municipal Transportation Agency, AT&T, etc.)
  - query by address
