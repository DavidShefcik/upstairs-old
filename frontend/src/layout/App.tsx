import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "~/constants/theme";
import Navigation from "./Navigation";

import "~/assets/global.css";

const client = new ApolloClient({
  uri: `${__API_URL__}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Navigation />
      </ChakraProvider>
    </ApolloProvider>
  );
}
