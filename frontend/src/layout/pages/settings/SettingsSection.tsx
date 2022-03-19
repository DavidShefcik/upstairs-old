import { FormEvent, ReactNode } from "react";
import { Box, Text, Button, HStack } from "@chakra-ui/react";
import FloatingBox from "~/components/FloatingBox";

interface Props {
  children: ReactNode;
  title: string;
  onSubmit?(): Promise<void>;
  onCancel?(): void;
  submitLoading?: boolean;
  showButtons?: boolean;
  titleColor?: string;
  titleText?: string;
  submitButtonText?: string;
}

const BUTTON_WIDTH = "90px";

export default function SettingsSection({
  title,
  children,
  onSubmit,
  onCancel,
  submitLoading,
  showButtons,
  titleColor = "gray.700",
  titleText,
  submitButtonText = "Save",
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit && onSubmit();
  };

  return (
    <FloatingBox my="4" backgroundColor="gray.100">
      <Text
        color={titleColor}
        fontWeight="medium"
        fontStyle="italic"
        pt="3"
        pb="4"
        px="4"
        title={titleText}
      >
        {title}
      </Text>
      <form noValidate onSubmit={handleSubmit}>
        <Box px="4" mb="4">
          {children}
        </Box>
        {showButtons && (
          <HStack
            spacing="4"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            py="3"
            px="4"
            backgroundColor="gray.200"
            borderBottomRightRadius="md"
            borderBottomLeftRadius="md"
          >
            <Button
              color="gray.800"
              variant="link"
              width={BUTTON_WIDTH}
              onClick={onCancel}
              disabled={submitLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
              width={BUTTON_WIDTH}
              isLoading={submitLoading}
            >
              {submitButtonText}
            </Button>
          </HStack>
        )}
      </form>
    </FloatingBox>
  );
}
