import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";
import mapboxgl from "mapbox-gl";

import GitHubLogo from "./assets/github-logo.svg";
import { ITheme } from "./styles/theme";

import MapBox, { IViewState } from "./map/MapBox";
import FlightLayer from "./flights/FlightLayer";
import FlightsGeoJsonDataSource from "./flights/FlightsGeoJsonDataSource";
import FlightPopup from "./flights/FlightPopup";
import FlightInformationCardContainer from "./flights/FlightInformationCardContainer";
import FlightTrajectoryGeoJsonDataSource from "./flights/FlightTrajectoryGeoJsonDataSource";
import FlightTrajectoryLayer from "./flights/FlightTrajectoryLayer";
import AirportsGeoJsonDataSource from "./airports/AirportsGeoJsonDataSource";
import AirportLayer from "./airports/AirportLayer";

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
        withFullscreen={false}
        withGeolocateControl={true}
        accessToken={process.env.MAPBOX_ACCESS_TOKEN}
        onChange={handleMapChange}
        onClick={handleMapClick}
      >
        {view.bounds && (
          <React.Fragment>
            {(hoveredFlight || selectedFlight) && (
              <FlightPopup id={hoveredFlight || selectedFlight} />
            )}
            <AirportsGeoJsonDataSource id="airports" bounds={view.bounds}>
              <AirportLayer source="airports" />
            </AirportsGeoJsonDataSource>
            <FlightsGeoJsonDataSource id="flights" bounds={view.bounds}>
              <FlightLayer
                source="flights"
                onMouseEnter={handleFlightMouseEnter}
                onMouseLeave={handleFlightMouseOff}
                onClick={handleFlightClick}
              />
            </FlightsGeoJsonDataSource>
            {selectedFlight && (
              <FlightTrajectoryGeoJsonDataSource
                source="flight-trajectory"
                id={selectedFlight}
              >
                <FlightTrajectoryLayer source="flight-trajectory" />
              </FlightTrajectoryGeoJsonDataSource>
            )}
          </React.Fragment>
        )}
      </MapBox>
      {selectedFlight && (
        <div className={classes.information}>
          <FlightInformationCardContainer id={selectedFlight} />
        </div>
      )}
      <a
        href="https://github.com/janhartmann/flight-spotter"
        target="_blank"
        className={classes.github}
      >
        <img src={GitHubLogo} alt="Fork on GitHub" />
      </a>
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    fontFamily: theme.fonts.primary,
    fontSize: 12,
    lineHeight: 1.5,
    color: theme.colors.text,
    width: "100%",
    height: "100%",
    position: "relative"
  },
  information: {
    position: "absolute",
    bottom: 40,
    left: 10,
    zIndex: 10,
    width: "calc(100% - 20px)",
    [theme.layout.breakpoints.medium]: {
      width: "auto"
    }
  },
  github: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    "& > img": {
      width: 20
    }
  }
});

export default injectSheet(styles)(App);
