import { Select, SelectProps } from "@chakra-ui/react";

import { INPUT_STYLING } from "~/constants/theme";

export default function StyledSelect(props: SelectProps) {
  return <Select {...props} {...INPUT_STYLING} />;
}
