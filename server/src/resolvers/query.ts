import { QueryResolvers } from "./generated-types";

export const queryResolver: QueryResolvers = {
  flights: async (parent, args, context) => {
    const { latitudeMin, latitudeMax, longitudeMin, longitudeMax } = args.input;
    const bounds = [[latitudeMin, longitudeMin], [latitudeMax, longitudeMax]];
    return context.dataSources.flightApi.getFlights(bounds);
  },
  flight: async (parent, args, context) => {
    const { id } = args.input;
    return context.dataSources.flightApi.getFlight(id);
  }
};
