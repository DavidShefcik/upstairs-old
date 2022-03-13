import { ReactNode } from "react";
import { Box, Flex, StyleProps } from "@chakra-ui/react";

import useDeviceSize from "~/hooks/useDeviceSize";

type Props = StyleProps & {
  children: ReactNode;
};

const MOBILE_WIDTH = "95%";
const DESKTOP_WIDTH = "75%";
const ULTRAWIDE_WIDTH = "60%";

export default function PageWidth(props: Props) {
  const { children } = props;

  const { isMobile, isDesktop, isUltrawide } = useDeviceSize();

  let width = "2";
  if (isMobile) {
    width = MOBILE_WIDTH;
  } else if (isDesktop) {
    width = DESKTOP_WIDTH;
  } else if (isUltrawide) {
    width = ULTRAWIDE_WIDTH;
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
