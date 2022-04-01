import { ReactNode } from "react";
import { Box, StyleProps, Text } from "@chakra-ui/react";
import _omit from "lodash.omit";

import FloatingBox from "~/components/FloatingBox";

interface Props {
  title: string;
  titleColor?: string;
  titleHoverText?: string;
  children: ReactNode;
}

export type BaseSettingsSectionProps = StyleProps & Props;

const OMITTED_BASE_SETTINGS_SECTION_PROPS: Array<keyof Props> = [
  "title",
  "titleColor",
  "titleHoverText",
  "children",
];

export default function BaseSettingsSection(props: BaseSettingsSectionProps) {
  const { title, titleColor = "gray.700", titleHoverText, children } = props;

  return (
    <FloatingBox my="4" backgroundColor="gray.100">
      <Text
        color={titleColor}
        fontWeight="medium"
        fontStyle="italic"
        pt="3"
        pb="4"
        px="4"
        title={titleHoverText}
      >
        {title}
      </Text>
      <Box mb="4" mx="4" {..._omit(props, OMITTED_BASE_SETTINGS_SECTION_PROPS)}>
        {children}
      </Box>
    </FloatingBox>
  );
}
