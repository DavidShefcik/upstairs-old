import { useState } from "react";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  Button,
  ModalBody,
  HStack,
  ButtonProps,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export type IConfirmResult =
  | {
      success: true;
      error?: never;
    }
  | {
      success?: never;
      error: string;
    };

// We have to make the props extend Record<string, unknown>
// otherwise we can't use the prop type for NiceModal's
// create method
interface Props extends Record<string, unknown> {
  title: string;
  message: string;
  onConfirm(): Promise<IConfirmResult>;
  onSuccess(): void;
  submitButtonText?: string;
  submitButtonColorScheme?: ButtonProps["colorScheme"];
}

const MODAL_FOOTER_BUTTON_WIDTH = "90px";

export default NiceModal.create<Props>(
  ({
    title,
    message,
    onConfirm,
    onSuccess,
    submitButtonText = "Ok",
    submitButtonColorScheme = "brand",
  }) => {
    const { visible, hide } = useModal();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      setLoading(true);
      setError("");

      const { success, error } = await onConfirm();

      setLoading(false);

      if (success) {
        hide();

        onSuccess();
      } else {
        setError(error);
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
          <ModalHeader>{title}</ModalHeader>
          <ModalBody mb="6" mt="2">
            <Text color={error && "red.600"}>{error || message}</Text>
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
                colorScheme={submitButtonColorScheme}
                onClick={handleSubmit}
                isLoading={loading}
                autoFocus
                width={MODAL_FOOTER_BUTTON_WIDTH}
              >
                {submitButtonText}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);
