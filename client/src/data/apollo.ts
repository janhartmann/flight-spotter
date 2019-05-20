import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

import introspectionResultData from "./generated-types";

const httpLink = createHttpLink({
  uri: process.env.FLIGHT_SPOTTER_SERVER || "http://localhost:5000"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // tslint:disable-next-line:no-console
    console.error("Error Fetching Data", graphQLErrors);
  }

  if (networkError) {
    // tslint:disable-next-line:no-console
    console.error(networkError);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all"
    }
  },
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspectionResultData
    }),
    cacheRedirects: {
      Query: {
        flight: (_, args, { getCacheKey }) =>
          getCacheKey({
            __typename: "Flight",
            id: args.input.id
          })
      }
    }
  })
});
