import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useDeviceSize from "~/hooks/useDeviceSize";

interface Props {
  children: ReactNode;
}

export default function PageWidth({ children }: Props) {
  const { isMobile, isDesktop, isUltrawide } = useDeviceSize();

  let width = "2";
  if (isMobile) {
    width = "95%";
  } else if (isDesktop) {
    width = "75%";
  } else if (isUltrawide) {
    width = "60%";
  }

  return (
    <Flex width="100%" height="100%" flexDirection="column" alignItems="center">
      <Box {...{ width }} height="100%">
        {children}
      </Box>
    </Flex>
  );
}
