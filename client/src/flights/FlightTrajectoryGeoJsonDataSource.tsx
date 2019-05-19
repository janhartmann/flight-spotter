import * as React from "react";
import * as turf from "@turf/turf";
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
        const featureCollection = convert(data && data.flight);
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
        flight.route && flight.route.arrival
          ? turf.greatCircle(
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
