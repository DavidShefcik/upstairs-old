import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import MobileMenuContextProvider from "~/context/ui/MobileMenu";
import Header, { HEADER_HEIGHT } from "./Header";
import MobileMenu from "./MobileMenu";

export default function Layout() {
  return (
    <>
      <MobileMenuContextProvider>
        <Header />
        <MobileMenu />
      </MobileMenuContextProvider>
      <Flex
        flexDirection="column"
        width="100%"
        minHeight={`calc(100% - ${HEADER_HEIGHT})`}
      >
        <Outlet />
      </Flex>
    </>
  );
}
