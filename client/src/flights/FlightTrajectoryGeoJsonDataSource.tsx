import * as React from "react";
import turfGreatCircle from "@turf/great-circle";
import { GetFlightTrajectory } from "../data/generated-types";
import GeoJsonDataSource from "../map/GeoJsonDataSource";

interface IFlightTrajectoryGeoJsonDataSourceProps {
  source: string;
  id: string;
}

const FlightTrajectoryGeoJsonDataSource: React.FC<
  IFlightTrajectoryGeoJsonDataSourceProps
> = ({ source, id, children }) => {
  return (
    <GetFlightTrajectory.Component
      variables={{
        input: {
          id
        }
      }}
    >
      {({ data }) => {
        const featureCollection = convert(data.flight);
        return (
          <GeoJsonDataSource id={source} data={featureCollection}>
            {children}
          </GeoJsonDataSource>
        );
      }}
    </GetFlightTrajectory.Component>
  );
};

const convert = (
  flight: GetFlightTrajectory.Flight
): GeoJSON.FeatureCollection<GeoJSON.LineString> => {
  const features = flight
    ? [
        {
          type: "Feature",
          properties: {
            type: "trajectory"
          },
          geometry: {
            type: "LineString",
            coordinates: flight.trajectory
              ? [
                  ...flight.trajectory.paths.map(path => [
                    path.coordinates.longitude,
                    path.coordinates.latitude
                  ])
                ]
              : []
          }
        },
        {
          type: "Feature",
          properties: {
            type: "departure"
          },
          geometry: {
            type: "LineString",
            coordinates:
              flight.route && flight.route.departure
                ? [
                    [
                      flight.route.departure.coordinates.longitude,
                      flight.route.departure.coordinates.latitude
                    ],
                    [flight.coordinates.longitude, flight.coordinates.latitude]
                  ]
                : []
          }
        },
        flight.route && flight.route.arrival
          ? turfGreatCircle(
              [flight.coordinates.longitude, flight.coordinates.latitude],
              [
                flight.route.arrival.coordinates.longitude,
                flight.route.arrival.coordinates.latitude
              ],
              {
                properties: {
                  type: "arrival"
                }
              }
            )
          : {}
      ]
    : [];

  return {
    type: "FeatureCollection",
    features: [].concat(features)
  };
};

export default FlightTrajectoryGeoJsonDataSource;
