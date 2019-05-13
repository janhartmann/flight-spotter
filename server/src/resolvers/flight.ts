import { FlightResolvers, PositionSource } from "./generated-types";

export const flightResolver: FlightResolvers = {
  id: parent => {
    return parent[0]; // We use the ICAO 24 as the identifier
  },
  callsign: parent => {
    if (parent[1]) {
      return parent[1].trim();
    }
    return null;
  },
  originCountry: parent => {
    return parent[2];
  },
  timePosition: parent => {
    return parent[3];
  },
  lastContact: parent => {
    return parent[4];
  },
  coordinates: parent => {
    if (parent[5] && parent[6]) {
      return {
        longitude: parent[5],
        latitude: parent[6]
      };
    }
    return null;
  },
  altitude: parent => {
    if (parent[7] || parent[13]) {
      return {
        barometric: parent[7],
        geometric: parent[13]
      };
    }
    return null;
  },
  grounded: parent => {
    return parent[8];
  },
  velocity: parent => {
    return parent[9];
  },
  direction: parent => {
    return parent[10];
  },
  verticalRate: parent => {
    return parent[11];
  },
  sensors: parent => {
    return parent[12];
  },
  squawk: parent => {
    return parent[14];
  },
  spi: parent => {
    return parent[15];
  },
  positionSource: parent => {
    switch (parent[16]) {
      case 0:
        return PositionSource.ADS_B;
      case 1:
        return PositionSource.ASTERIX;
      case 2:
        return PositionSource.MLAT;
      default:
        return null;
    }
  },
  trajectory: async (parent, args, context) => {
    return context.dataSources.flightApi.getTrajectory(parent[0]);
  },
  route: async (parent, args, context) => {
    if (parent[1]) {
      // parent[1] is callsign
      return context.dataSources.flightApi.getRoute(parent[1].trim());
    }
    return null;
  }
};
