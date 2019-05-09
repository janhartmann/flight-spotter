import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";
import * as mapboxgl from "mapbox-gl";

import MapBox, { IViewState } from "./map/MapBox";
import FlightLayer from "./flights/FlightLayer";
import FlightsGeoJsonDataSource from "./flights/FlightsGeoJsonDataSource";
import FlightPopup from "./flights/FlightPopup";

const App: React.FC<StyledComponentProps> = ({ classes }) => {
  const [hoveredFlight, setHoveredFlight] = React.useState<string>(null);
  const [view, setView] = React.useState<IViewState>({
    center: new mapboxgl.LngLat(10.210365, 56.156635),
    zoom: 6,
    bounds: null
  });

  const handleMapChange = React.useCallback(
    (e: IViewState) => {
      setView(e);
    },
    [view]
  );

  const handleOpenPopup = (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => {
    setHoveredFlight(e.features[0].properties.id);
  };

  const handleClosePopup = () => {
    setHoveredFlight(null);
  };

  return (
    <div className={classes.root}>
      <MapBox
        style="mapbox://styles/mapbox/dark-v9"
        center={view.center}
        zoom={view.zoom}
        withCompass={true}
        withZoom={true}
        withFullscreen={true}
        withGeolocateControl={true}
        accessToken="pk.eyJ1IjoiamFuaGFydG1hbm4iLCJhIjoiY2pwMTNreGczMzFzZDN2cGFxMWYwN2Q4MSJ9.k00uopdj4dH_lW0cgNC8Yg"
        onChange={handleMapChange}
      >
        {view.bounds && (
          <React.Fragment>
            <FlightsGeoJsonDataSource id="flights" bounds={view.bounds} />
            <FlightLayer
              id="flights"
              source="flights"
              onMouseEnter={handleOpenPopup}
              onMouseLeave={handleClosePopup}
            />
            {hoveredFlight && <FlightPopup id={hoveredFlight} />}
          </React.Fragment>
        )}
      </MapBox>
    </div>
  );
};

const styles: StyleCreator = () => ({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    width: "100%",
    height: "100%",
    position: "relative"
  }
});

export default injectSheet(styles)(App);
