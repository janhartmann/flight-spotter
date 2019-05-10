import { QueryResolvers } from "./generated-types";

export const queryResolver: QueryResolvers = {
  flights: async (parent, args, context) => {
    const { latitudeMin, latitudeMax, longitudeMin, longitudeMax } = args.input;
    const bounds = [[latitudeMin, longitudeMin], [latitudeMax, longitudeMax]];
    const results = await context.dataSources.flightApi.getFlights(bounds);
    if (results) {
      // We are only interested in the flights not grounded
      return results.filter(result => result[8] === false);
    }
  },
  flight: async (parent, args, context) => {
    const { id } = args.input;
    return context.dataSources.flightApi.getFlight(id);
  }
};
