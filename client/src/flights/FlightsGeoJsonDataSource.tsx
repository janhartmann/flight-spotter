import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";
import { withApollo, WithApolloClient } from "react-apollo";
import classNames from "classnames";

import {
  GetFlights,
  GetFlightsQuery,
  GetFlightsDocument
} from "../data/generated-types";
import Spinner from "../shared/Spinner";
import { getFlightPathPrediction } from "./path-prediction";
import GeoJsonDataSource from "../map/GeoJsonDataSource";

export interface IFlightsGeoJsonDataSourceProps
  extends StyledComponentProps,
    Partial<WithApolloClient<any>> {
  id: string;
  bounds: mapboxgl.LngLatBounds;
}

const FlightsGeoJsonDataSource: React.FC<IFlightsGeoJsonDataSourceProps> = ({
  classes,
  bounds,
  id,
  children,
  client
}) => {
  const previousData = React.useRef<GetFlightsQuery>(null);
  const interval = React.useRef(0);

  const handleOnComplete = (data: GetFlightsQuery) => {
    if (
      JSON.stringify(data) === JSON.stringify(previousData.current) ||
      data.flights.length > 1000 // We wont animate paths for above 1000 flights
    ) {
      return;
    }

    const steps = 50;
    const duration = 10; // in seconds
    const predictions: {
      [index: string]: Array<GeoJSON.Feature<GeoJSON.Point>>;
    } = {};

    data.flights.forEach(flight => {
      predictions[flight.id] = getFlightPathPrediction(
        [flight.coordinates.longitude, flight.coordinates.latitude],
        flight.velocity,
        duration,
        flight.direction,
        steps
      );
    });

    if (interval.current) {
      window.clearInterval(interval.current);
    }

    let counter = 0;
    interval.current = window.setInterval(() => {
      if (counter < steps) {
        previousData.current = {
          flights: data.flights.map(flight => {
            const step = predictions[flight.id];
            if (step && step[counter]) {
              return {
                ...flight,
                coordinates: {
                  ...flight.coordinates,
                  longitude: step[counter].geometry.coordinates[0],
                  latitude: step[counter].geometry.coordinates[1]
                }
              };
            }
            return flight;
          })
        };

        client.writeQuery({
          query: GetFlightsDocument,
          variables: {
            predict: true
          },
          data: previousData.current
        });

        counter++;
      } else {
        window.clearInterval(interval.current);
      }
    }, (1000 * duration) / steps);
  };

  return (
    <GetFlights.Component
      variables={{
        input: {
          latitudeMin: parseFloat(bounds.getSouthWest().lat.toFixed(3)),
          longitudeMin: parseFloat(bounds.getSouthWest().lng.toFixed(3)),
          latitudeMax: parseFloat(bounds.getNorthEast().lat.toFixed(3)),
          longitudeMax: parseFloat(bounds.getNorthEast().lng.toFixed(3))
        }
      }}
      pollInterval={5000}
      onCompleted={handleOnComplete}
    >
      {({ data, loading }) => {
        const featureCollection = convert(data && data.flights);
        return (
          <GeoJsonDataSource id={id} data={featureCollection}>
            <div
              className={classNames({
                [classes.spinner]: true,
                [classes.loading]: loading
              })}
            >
              <Spinner size="small" />
            </div>
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
            id: flight.id,
            properties: {
              id: flight.id,
              direction: flight.direction,
              velocity: flight.velocity
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
    top: 150,
    right: 10,
    background: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    opacity: 0,
    transition: "all ease-in 0.2s"
  },
  loading: {
    opacity: 1
  }
});

export default injectSheet(styles)(withApollo(FlightsGeoJsonDataSource));
