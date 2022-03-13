import { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SettingsContent({ title, children }: Props) {
  return (
    <Box width="100%" height="auto" py="1" px="16">
      <Text
        fontSize="2xl"
        fontWeight="medium"
        fontStyle="italic"
        paddingBottom="5"
      >
        {title}
      </Text>
      {children}
    </Box>
  );
}
