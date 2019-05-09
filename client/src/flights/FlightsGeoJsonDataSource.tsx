import * as React from "react";
import { GetFlights } from "../data/generated-types";
import GeoJsonDataSource from "../map/GeoJsonDataSource";

interface IFlightsGeoJsonDataSourceProps {
  id: string;
  bounds: mapboxgl.LngLatBounds;
}

const FlightsGeoJsonDataSource: React.FC<IFlightsGeoJsonDataSourceProps> = ({
  id,
  bounds
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
          <GeoJsonDataSource
            id={id}
            data={featureCollection}
            loading={loading}
          />
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

export default FlightsGeoJsonDataSource;
