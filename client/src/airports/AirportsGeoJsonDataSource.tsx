import * as React from "react";

import { GetFlights, GetAirports, AirportSize } from "../data/generated-types";
import GeoJsonDataSource from "../map/GeoJsonDataSource";

interface IAirportsGeoJsonDataSourceProps {
  id: string;
  bounds: mapboxgl.LngLatBounds;
}

const AirportsGeoJsonDataSource: React.FC<IAirportsGeoJsonDataSourceProps> = ({
  id,
  bounds,
  children
}) => {
  return (
    <GetAirports.Component
      variables={{
        input: {
          latitudeMin: bounds.getSouthWest().lat,
          longitudeMin: bounds.getSouthWest().lng,
          latitudeMax: bounds.getNorthEast().lat,
          longitudeMax: bounds.getNorthEast().lng,
          size: AirportSize.LargeAirport
        }
      }}
    >
      {({ data }) => {
        const featureCollection = convert(data.airports);
        return (
          <GeoJsonDataSource id={id} data={featureCollection}>
            {children}
          </GeoJsonDataSource>
        );
      }}
    </GetAirports.Component>
  );
};

const convert = (
  airports: GetAirports.Airports[]
): GeoJSON.FeatureCollection<GeoJSON.Point> => {
  const features = airports
    ? airports
        .filter(
          airport =>
            airport.coordinates &&
            airport.coordinates.longitude &&
            airport.coordinates.latitude
        )
        .map(airport => {
          return {
            type: "Feature",
            properties: {
              id: airport.id
            },
            geometry: {
              type: "Point",
              coordinates: [
                airport.coordinates.longitude,
                airport.coordinates.latitude
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

export default AirportsGeoJsonDataSource;
