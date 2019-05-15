import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";
import mapboxgl from "mapbox-gl";

import MapBox, { IViewState } from "./map/MapBox";
import FlightLayer from "./flights/FlightLayer";
import FlightsGeoJsonDataSource from "./flights/FlightsGeoJsonDataSource";
import FlightPopup from "./flights/FlightPopup";
import { ITheme } from "./styles/theme";
import FlightInformationCardContainer from "./flights/FlightInformationCardContainer";
import FlightTrajectoryGeoJsonDataSource from "./flights/FlightTrajectoryGeoJsonDataSource";
import FLightTrajectoryLayer from "./flights/FLightTrajectoryLayer";

const App: React.FC<StyledComponentProps> = ({ classes }) => {
  const [hoveredFlight, setHoveredFlight] = React.useState<string>(null);
  const [selectedFlight, setSelectedFlight] = React.useState<string>(null);
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

  const handleMapClick = React.useCallback(() => {
    setSelectedFlight(null);
  }, [selectedFlight]);

  const handleFlightMouseEnter = (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => {
    setHoveredFlight(e.features[0].properties.id);
  };

  const handleFlightMouseOff = React.useCallback(() => {
    setHoveredFlight(null);
  }, [hoveredFlight]);

  const handleFlightClick = (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => {
    setSelectedFlight(e.features[0].properties.id);
  };

  return (
    <div className={classes.root}>
      <MapBox
        style="mapbox://styles/janhartmann/cjviak2mq05ik1ct67dacly2l"
        center={view.center}
        zoom={view.zoom}
        withCompass={true}
        withZoom={true}
        withFullscreen={true}
        withGeolocateControl={true}
        accessToken="pk.eyJ1IjoiamFuaGFydG1hbm4iLCJhIjoiY2pwMTNreGczMzFzZDN2cGFxMWYwN2Q4MSJ9.k00uopdj4dH_lW0cgNC8Yg"
        onChange={handleMapChange}
        onClick={handleMapClick}
      >
        {view.bounds && (
          <React.Fragment>
            {(hoveredFlight || selectedFlight) && (
              <FlightPopup id={hoveredFlight || selectedFlight} />
            )}
            {selectedFlight && (
              <React.Fragment>
                <FlightTrajectoryGeoJsonDataSource
                  source="flight-trajectory"
                  id={selectedFlight}
                >
                  <FLightTrajectoryLayer source="flight-trajectory" />
                </FlightTrajectoryGeoJsonDataSource>
                <div className={classes.information}>
                  <FlightInformationCardContainer id={selectedFlight} />
                </div>
              </React.Fragment>
            )}
            <FlightsGeoJsonDataSource id="flights" bounds={view.bounds}>
              <FlightLayer
                source="flights"
                onMouseEnter={handleFlightMouseEnter}
                onMouseLeave={handleFlightMouseOff}
                onClick={handleFlightClick}
              />
            </FlightsGeoJsonDataSource>
          </React.Fragment>
        )}
      </MapBox>
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.text,
    width: "100%",
    height: "100%",
    position: "relative"
  },
  information: {
    position: "absolute",
    bottom: 40,
    left: 40,
    zIndex: 10
  }
});

export default injectSheet(styles)(App);
