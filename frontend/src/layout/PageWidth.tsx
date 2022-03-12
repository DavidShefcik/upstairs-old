import { ReactNode } from "react";
import { Box, Flex, StyleProps } from "@chakra-ui/react";

import useDeviceSize from "~/hooks/useDeviceSize";

type Props = StyleProps & {
  children: ReactNode;
};

export default function PageWidth(props: Props) {
  const { children } = props;

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
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      {...props}
    >
      <Box {...{ width }} height="100%">
        {children}
      </Box>
    </Flex>
  );
}
