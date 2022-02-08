import { useMediaQuery } from "@chakra-ui/react";

const MAXIMUM_MOBILE_SIZE = 768;

export default function useIsMobile(): boolean {
  const [isMobile] = useMediaQuery(`(max-width: ${MAXIMUM_MOBILE_SIZE}px)`);

  return isMobile;
}
