import { Box, Button, HStack } from "@chakra-ui/react";
import _omit from "lodash.omit";

import Form, { FormProps } from "~/components/inputs/Form";
import BaseSettingsSection, {
  BaseSettingsSectionProps,
} from "./BaseSettingsSection";

/**
 * T is the type of the fields, R
 * is the type of the response
 */
export type Props<T, R> = FormProps<T, R> &
  BaseSettingsSectionProps & {
    showButtons?: boolean;
    onCancel(): void;
  };

const BUTTON_WIDTH = "90px";
const OMITTED_FORM_PROPS_FOR_SETTINGS_SECTION: Array<
  keyof Props<unknown, unknown>
> = [
  "data",
  "fields",
  "mutation",
  "onCancel",
  "onError",
  "setErrors",
  "isSubmitting",
  "setIsSubmitting",
  "showButtons",
  "customValidation",
];

export default function FormSettingsSection<
  T extends { [K in keyof T]: string | boolean },
  R = undefined
>(props: Props<T, R>) {
  const { submitButtonText = "Save", children, showButtons } = props;

  return (
    <BaseSettingsSection
      {...(_omit(props, OMITTED_FORM_PROPS_FOR_SETTINGS_SECTION) as Props<
        T,
        R
      >)}
      mb="0"
      mx="0"
    >
      <Form<T, R> {...props}>
        <Box width="100%" px="4" mx="4">
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
    </BaseSettingsSection>
  );
}
