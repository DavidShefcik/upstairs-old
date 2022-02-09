import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Header, { HEADER_HEIGHT } from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
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
