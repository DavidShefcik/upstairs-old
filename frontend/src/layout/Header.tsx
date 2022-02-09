import { Link } from "react-router-dom";
import { Flex, Link as ChakraLink, HStack, CSSObject } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { unauthenticatedNavLinks } from "~/constants/links";
import useIsMobile from "~/hooks/useIsMobile";

export const HEADER_HEIGHT = "60px";

const HAMBURGER_ICON_SIZE = 8;

const LINK_ACTION_STYLE: CSSObject = {
  textDecoration: "none",
  textColor: "gray.100",
};

function RightLinks() {
  // TODO: Authenticated links
  return (
    <HStack spacing="5" marginRight="20">
      {unauthenticatedNavLinks.map(({ text, path }) => (
        <ChakraLink
          key={path}
          as={Link}
          to={path}
          title={text}
          fontSize="lg"
          textColor="gray.200"
          textDecoration="none"
          fontWeight="bold"
          _hover={LINK_ACTION_STYLE}
          _focus={LINK_ACTION_STYLE}
        >
          {text}
        </ChakraLink>
      ))}
    </HStack>
  );
}

function HamburgerMenu() {
  const handleIconClick = () => {
    // TODO: Toggle side drawer
    console.log("Hamburger menu click");
  };

  return (
    <Flex
      width="auto"
      height="100%"
      alignItems="center"
      onClick={handleIconClick}
      cursor="pointer"
      title="Menu"
      paddingX="5"
    >
      <HamburgerIcon
        w={HAMBURGER_ICON_SIZE}
        height={HAMBURGER_ICON_SIZE}
        color="gray.100"
      />
    </Flex>
  );
}

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="brand.100"
      height={HEADER_HEIGHT}
      position="sticky"
      left={0}
      top={0}
    >
      <ChakraLink
        as={Link}
        to="/"
        title="Upstairs"
        marginX={isMobile ? "5" : "20"}
        fontSize="2xl"
        fontWeight="bold"
        fontStyle="italic"
        color="gray.100"
        _hover={LINK_ACTION_STYLE}
        _focus={LINK_ACTION_STYLE}
      >
        Upstairs
      </ChakraLink>
      {isMobile ? <HamburgerMenu /> : <RightLinks />}
    </Flex>
  );
}
