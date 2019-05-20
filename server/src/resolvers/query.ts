import { QueryResolvers, AirportSize } from "./generated-types";

export const queryResolver: QueryResolvers = {
  flights: async (parent, args, context) => {
    const { latitudeMin, latitudeMax, longitudeMin, longitudeMax } = args.input;
    const bounds = [[latitudeMin, longitudeMin], [latitudeMax, longitudeMax]];
    const results = await context.dataSources.flightApi.getFlights(bounds);
    if (results && results.length > 0) {
      // We are only interested in the flights not grounded
      return results.filter(result => result[8] === false);
    }
    return [];
  },
  flight: async (parent, args, context) => {
    const { id } = args.input;
    return context.dataSources.flightApi.getFlight(id);
  },
  airports: async (parent, args, context) => {
    const {
      latitudeMin,
      latitudeMax,
      longitudeMin,
      longitudeMax,
      size
    } = args.input;
    const bounds = [[latitudeMin, longitudeMin], [latitudeMax, longitudeMax]];
    let airportType: string;
    if (size) {
      switch (size) {
        case AirportSize.LARGE_AIRPORT:
          airportType = "large_airport";
          break;
        case AirportSize.MEDIUM_AIRPORT:
          airportType = "medium_airport";
          break;
        case AirportSize.SMALL_AIRPORT:
          airportType = "small_airport";
          break;
      }
    }
    return context.dataSources.flightApi.getAirports(bounds, airportType);
  },
  airport: async (parent, args, context) => {
    const { id } = args.input;
    return context.dataSources.flightApi.getAirport(id);
  }
};
