import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navigation from "./Navigation";

const client = new ApolloClient({
  uri: `${__API_URL__}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
