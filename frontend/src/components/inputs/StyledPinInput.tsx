import { PinInput, PinInputField, PinInputProps } from "@chakra-ui/react";

import { INPUT_STYLING } from "~/constants/theme";

export type StyledPinInputProps = Omit<PinInputProps, "children"> & {
  valueLength: number;
};

export default function StyledPinInput(props: StyledPinInputProps) {
  const { valueLength } = props;

  return (
    <PinInput {...props}>
      {Array.from(Array(valueLength)).map((_, index) => (
        <PinInputField key={`pin-${index}`} {...INPUT_STYLING} />
      ))}
    </PinInput>
  );
}
