import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import schema from "./schema";
import resolvers from "./resolvers";
import { IContext } from "./context";

import FlightApi from "./api/OpenSkyNetworkApi";

export const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers
  }),
  cors: {
    origin: process.env.CORS_ORIGIN || "*"
  },
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
