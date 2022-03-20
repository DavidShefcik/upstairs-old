import { PinInput, PinInputField, PinInputProps } from "@chakra-ui/react";

import { INPUT_STYLING } from "~/constants/theme";

export type StyledPinInputProps = Omit<PinInputProps, "children"> & {
  valueLength: number;
};

export default function StyledPinInput(props: StyledPinInputProps) {
  const { valueLength } = props;

  return (
    <PinInput {...props}>
      {new Array(valueLength).map((val) => (
        <PinInputField key={val} {...INPUT_STYLING} />
      ))}
    </PinInput>
  );
}
