import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";

import { useMobileMenuContext } from "~/context/ui/MobileMenu";
import {
  authenticatedNavLinks,
  unauthenticatedNavLinks,
} from "~/constants/links";
import useDeviceSize from "~/hooks/useDeviceSize";
import { useSessionContext } from "~/context/Session";

export default function MobileMenu() {
  const { isOpen, setIsOpen } = useMobileMenuContext();
  const { isLoggedIn } = useSessionContext();
  const { isMobile } = useDeviceSize();

  useEffect(() => {
    if (isOpen && !isMobile) {
      setIsOpen(false);
    }
  }, [isOpen, isMobile, setIsOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerBody paddingY="12">
          <VStack spacing="6">
            {(isLoggedIn ? authenticatedNavLinks : unauthenticatedNavLinks).map(
              ({ text, path }) => (
                <ChakraLink
                  key={path}
                  as={Link}
                  to={path}
                  title={text}
                  fontSize="xl"
                >
                  {text}
                </ChakraLink>
              )
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
