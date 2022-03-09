import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  Button,
  ModalBody,
  Flex,
  HStack,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { useSessionContext } from "~/context/Session";

// We have to make the props extend Record<string, unknown>
// otherwise we can't use the prop type for NiceModal's
// create method
interface Props extends Record<string, unknown> {
  onSuccess(): void;
}

const MODAL_FOOTER_BUTTON_WIDTH = "90px";

export default NiceModal.create<Props>(({ onSuccess }) => {
  const { visible, hide } = useModal();
  const { logout } = useSessionContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const success = await logout();

    setLoading(false);

    if (success) {
      hide();

      onSuccess();
    } else {
      setError("Failed to logout! Please try again.");
    }
  };

  return (
    <Modal
      isOpen={visible}
      onClose={hide}
      isCentered
      closeOnEsc={!loading}
      closeOnOverlayClick={!loading}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden" mx="2">
        <ModalHeader>Logout</ModalHeader>
        <ModalBody mb="6" mt="2">
          <Text color={error && "red.600"}>
            {error || "Are you sure you want to logout?"}
          </Text>
        </ModalBody>
        <ModalFooter backgroundColor="gray.100">
          <HStack spacing="4">
            <Button
              color="gray.800"
              onClick={hide}
              disabled={loading}
              variant="link"
              width={MODAL_FOOTER_BUTTON_WIDTH}
            >
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleSubmit}
              isLoading={loading}
              autoFocus
              width={MODAL_FOOTER_BUTTON_WIDTH}
            >
              Ok
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
