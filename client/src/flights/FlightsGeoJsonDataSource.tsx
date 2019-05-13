import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";

import { GetFlights } from "../data/generated-types";
import GeoJsonDataSource from "../map/GeoJsonDataSource";
import Spinner from "../shared/Spinner";

interface IFlightsGeoJsonDataSourceProps extends StyledComponentProps {
  id: string;
  bounds: mapboxgl.LngLatBounds;
}

const FlightsGeoJsonDataSource: React.FC<IFlightsGeoJsonDataSourceProps> = ({
  classes,
  id,
  bounds,
  children
}) => {
  return (
    <GetFlights.Component
      variables={{
        input: {
          latitudeMin: bounds.getSouthWest().lat,
          longitudeMin: bounds.getSouthWest().lng,
          latitudeMax: bounds.getNorthEast().lat,
          longitudeMax: bounds.getNorthEast().lng
        }
      }}
      notifyOnNetworkStatusChange={true}
      pollInterval={10000}
    >
      {({ data, loading }) => {
        const featureCollection = convert(data.flights);
        return (
          <GeoJsonDataSource id={id} data={featureCollection}>
            {loading && (
              <div className={classes.spinner}>
                <Spinner size="small" />
              </div>
            )}
            {children}
          </GeoJsonDataSource>
        );
      }}
    </GetFlights.Component>
  );
};

const convert = (
  flights: GetFlights.Flights[]
): GeoJSON.FeatureCollection<GeoJSON.Point> => {
  const features = flights
    ? flights
        .filter(
          flight =>
            flight.coordinates &&
            flight.coordinates.longitude &&
            flight.coordinates.latitude
        )
        .map(flight => {
          return {
            type: "Feature",
            properties: {
              id: flight.id,
              direction: flight.direction
            },
            geometry: {
              type: "Point",
              coordinates: [
                flight.coordinates.longitude,
                flight.coordinates.latitude
              ]
            }
          };
        })
    : [];

  return {
    type: "FeatureCollection",
    features: [].concat(features)
  };
};

const styles: StyleCreator = () => ({
  spinner: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 10,
    background: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
    borderRadius: 4
  }
});

export default injectSheet(styles)(FlightsGeoJsonDataSource);
