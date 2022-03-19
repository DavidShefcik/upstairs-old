import { Dispatch, SetStateAction } from "react";
import { InputProps } from "@chakra-ui/react";

import StyledInput from "./StyledInput";
import { isValidNumber } from "~/utils/number";
import { INPUT_SETTINGS } from "~/constants/inputs";

type Props = Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export default function ZipCodeInput(props: Props) {
  const { value, onChange } = props;

  const handleChange = (val: string) => {
    /**
     * We check if it is not an empty string
     * to allow for select all + backspace
     */
    if (val !== "" && !isValidNumber(val)) {
      return;
    }

    onChange(val);
  };

  return (
    <StyledInput
      {...props}
      type="tel"
      maxLength={INPUT_SETTINGS.zip_code.maxLength}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}
