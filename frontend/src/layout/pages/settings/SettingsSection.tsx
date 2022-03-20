import { FormEvent, ReactNode } from "react";
import { Box, Text, Button, HStack } from "@chakra-ui/react";
import FloatingBox from "~/components/FloatingBox";
import Form, { FormProps } from "~/components/inputs/Form";

/**
 * T is the type of the fields, R
 * is the type of the response
 */
export type Props<T, R> = FormProps<T, R> & {
  title: string;
  showButtons?: boolean;
  titleColor?: string;
  titleText?: string;
  onCancel(): void;
};

const BUTTON_WIDTH = "90px";

export default function SettingsSection<
  T extends { [K in keyof T]: string },
  R = undefined
>(props: Props<T, R>) {
  const {
    titleColor = "gray.700",
    titleText = "Save",
    submitButtonText = "Save",
  } = props;

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
        {props.title}
      </Text>
      <Form<T, R> {...props}>
        <Box px="4" mb="4" width="100%">
          {props.children}
        </Box>
        {props.showButtons && (
          <HStack
            spacing="4"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            py="3"
            px="4"
            width="100%"
            backgroundColor="gray.200"
            borderBottomRightRadius="md"
            borderBottomLeftRadius="md"
          >
            <Button
              color="gray.800"
              variant="link"
              width={BUTTON_WIDTH}
              onClick={props.onCancel}
              disabled={props.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
              width={BUTTON_WIDTH}
              isLoading={props.isSubmitting}
            >
              {submitButtonText}
            </Button>
          </HStack>
        )}
      </Form>
    </FloatingBox>
  );
}
