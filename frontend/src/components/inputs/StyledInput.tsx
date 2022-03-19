import { Input, InputProps } from "@chakra-ui/react";

import { INPUT_STYLING } from "~/constants/theme";

export default function StyledInput(props: InputProps) {
  return <Input {...props} {...INPUT_STYLING} />;
}
