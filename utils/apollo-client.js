import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.API_ROUTE,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default client;
