import { Link } from "react-router-dom";
import {
  Flex,
  Link as ChakraLink,
  HStack,
  Box,
  StyleProps,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import {
  authenticatedNavLinks,
  unauthenticatedNavLinks,
} from "~/constants/links";
import useDeviceSize from "~/hooks/useDeviceSize";
import { useMobileMenuContext } from "~/context/ui/MobileMenu";
import PageWidth from "./PageWidth";
import { useSessionContext } from "~/context/Session";
import useLogoutModal from "~/hooks/modals/useLogoutModal";

export const HEADER_HEIGHT = "60px";

const HAMBURGER_ICON_SIZE = 8;

const LINK_ACTION_STYLE: StyleProps = {
  textDecoration: "none",
  textColor: "gray.100",
};

function RightLinks() {
  const { isLoggedIn } = useSessionContext();
  const { showLogoutModal } = useLogoutModal();

  return (
    <HStack spacing="5">
      <>
        {(isLoggedIn ? authenticatedNavLinks : unauthenticatedNavLinks).map(
          ({ text, path }) => (
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
          )
        )}
        {isLoggedIn && (
          <Text
            title="Logout"
            fontSize="lg"
            textColor="gray.200"
            textDecoration="none"
            fontWeight="bold"
            cursor="pointer"
            _hover={LINK_ACTION_STYLE}
            _focus={LINK_ACTION_STYLE}
            onClick={showLogoutModal}
          >
            Logout
          </Text>
        )}
      </>
    </HStack>
  );
}

function HamburgerMenu() {
  const { setIsOpen } = useMobileMenuContext();

  const handleIconClick = () => {
    setIsOpen(true);
  };

  return (
    <Flex
      width="auto"
      height="100%"
      alignItems="center"
      onClick={handleIconClick}
      cursor="pointer"
      title="Menu"
      paddingLeft="4"
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
  const { isMobile } = useDeviceSize();
  const { isLoggedIn } = useSessionContext();

  return (
    <Box
      backgroundColor="brand.100"
      height={HEADER_HEIGHT}
      position="sticky"
      left={0}
      top={0}
      zIndex={100}
    >
      <PageWidth>
        <Flex
          width="100%"
          height="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ChakraLink
            as={Link}
            to={isLoggedIn ? "/feed" : "/"}
            title="Upstairs"
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
      </PageWidth>
    </Box>
  );
}
