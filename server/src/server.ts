import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import schema from "./schema";
import resolvers from "./resolvers";
import { IContext } from "./context";

import FlightApi from "./api/FlightApi";

export const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers
  }),
  dataSources: () => {
    return {
      flightApi: new FlightApi()
    };
  },
  context: (context): IContext => {
    return {};
  }
});

export const startServer = async () => {
  return server.listen({
    port: process.env.port || 5000
  });
};
