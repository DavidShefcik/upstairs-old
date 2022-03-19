import { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

import useDeviceSize from "~/hooks/useDeviceSize";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SettingsContent({ title, children }: Props) {
  const { isMobile } = useDeviceSize();

  return (
    <Box width="100%" height="auto" py="1" px={isMobile ? "0" : "16"}>
      <Text
        fontSize="2xl"
        fontWeight="medium"
        fontStyle="italic"
        paddingBottom="2"
        paddingTop={isMobile ? "2" : "0"}
        px={isMobile ? "2" : "0"}
      >
        {title}
      </Text>
      {children}
    </Box>
  );
}
