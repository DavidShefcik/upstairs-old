import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import ErrorBoundary from "./ErrorBoundary";
import { theme } from "~/constants/theme";
import Navigation from "./Navigation";
import GlobalProvider from "~/context/GlobalProvider";

import "~/assets/global.css";

const client = new ApolloClient({
  uri: `${__API_URL__}/graphql`,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <Navigation />
          </GlobalProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
