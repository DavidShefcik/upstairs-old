import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Link as ChakraLink,
  VStack,
  Text,
} from "@chakra-ui/react";
import NiceModal from "@ebay/nice-modal-react";

import { useMobileMenuContext } from "~/context/ui/MobileMenu";
import {
  authenticatedNavLinks,
  unauthenticatedNavLinks,
} from "~/constants/links";
import useDeviceSize from "~/hooks/useDeviceSize";
import { useSessionContext } from "~/context/Session";
import LogoutModal from "./modals/LogoutModal";

export default function MobileMenu() {
  const { isOpen, setIsOpen } = useMobileMenuContext();
  const { isLoggedIn } = useSessionContext();
  const { isMobile } = useDeviceSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && !isMobile) {
      setIsOpen(false);
    }
  }, [isOpen, isMobile, setIsOpen]);

  const showLogoutModal = () => {
    NiceModal.show(LogoutModal, {
      onSuccess: () => navigate("/"),
    });
  };

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
            {isLoggedIn && (
              <Text
                title="Logout"
                fontSize="xl"
                cursor="pointer"
                onClick={showLogoutModal}
              >
                Logout
              </Text>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
