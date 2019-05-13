import { AirportResolvers } from "./generated-types";

export const airportResolver: AirportResolvers = {
  id: parent => {
    return parent.icao;
  },
  coordinates: parent => {
    if (parent.position) {
      return {
        longitude: parent.position.longitude,
        latitude: parent.position.latitude
      };
    }
    return null;
  },
  iata: parent => {
    return parent.iata;
  },
  name: parent => {
    return parent.name;
  }
};
