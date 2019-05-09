import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

import introspectionResultData from "./generated-types";

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
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

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResultData
});

export const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    fragmentMatcher,
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
