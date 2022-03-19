import { extendTheme } from "@chakra-ui/react";

import { COLORS } from "./colors";

export const INPUT_STYLING = {
  borderColor: "gray.400",
  focusBorderColor: "brand.600",
  _hover: {
    borderColor: "gray.500",
  },
};

const overrides = {
  colors: {
    brand: {
      100: COLORS.BRAND_PURPLE,
      200: COLORS.BRAND_PURPLE,
      300: COLORS.BRAND_PURPLE,
      400: COLORS.BRAND_PURPLE,
      500: COLORS.BRAND_PURPLE,
      600: COLORS.BRAND_MEDIUM_PURPLE,
      700: COLORS.BRAND_DARK_PURPLE,
      800: COLORS.BRAND_DARK_PURPLE,
      900: COLORS.BRAND_DARK_PURPLE,
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
      a: {
        color: "brand.100",
        textDecoration: "none",
        _hover: {
          color: "brand.600",
          textDecoration: "none",
        },
        _focus: {
          color: "brand.900",
          textDecoration: "none",
        },
      },
    },
  },
};

export const theme = extendTheme(overrides);
