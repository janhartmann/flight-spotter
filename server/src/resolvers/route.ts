import { RouteResolvers } from "./generated-types";

export const routeResolver: RouteResolvers = {
  departure: async (parent, args, context) => {
    return context.dataSources.flightApi.getAirport(parent.route[0]);
  },
  arrival: async (parent, args, context) => {
    return context.dataSources.flightApi.getAirport(parent.route[1]);
  }
};
