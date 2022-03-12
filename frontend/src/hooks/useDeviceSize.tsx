import { useMediaQuery } from "@chakra-ui/react";

export const MAXIMUM_MOBILE_SIZE = 768;
export const MAXIMUM_DESKTOP_SIZE = 1440;
export const MINIMUM_ULTRAWIDE_SIZE = MAXIMUM_DESKTOP_SIZE + 1;

interface ReturnType {
  isMobile: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
}

export default function useDeviceSize(): ReturnType {
  const [isMobile, isDesktop, isUltrawide] = useMediaQuery([
    `(max-width: ${MAXIMUM_MOBILE_SIZE}px)`,
    `(max-width: ${MAXIMUM_DESKTOP_SIZE}px)`,
    `(min-width: ${MINIMUM_ULTRAWIDE_SIZE}px)`,
  ]);

  return {
    isMobile,
    isDesktop,
    isUltrawide,
  };
}
