import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";
import { ReactChild } from "react";
import invariant from "invariant";

import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelect";

export enum INPUT_TYPE {
  TEXT,
  SELECT,
  CUSTOM,
}

interface ControlledInput {
  value: string;
  onChange(value: string): void;
}

type Props<T> = {
  id: string;
  label: string;
  error: string;
  disabled: boolean;
} & (
  | ({
      inputType: INPUT_TYPE.TEXT;
      maxLength: number;
      type?: InputProps["type"];
    } & ControlledInput)
  | ({
      inputType: INPUT_TYPE.SELECT;
      options: T[];
      uniqueKey: keyof T;
    } & ControlledInput)
  | {
      inputType: INPUT_TYPE.CUSTOM;
      children: ReactChild;
    }
);

export default function FormInput<T extends Record<string, string>>(
  props: Props<T>
) {
  const { id, label, error, disabled, inputType } = props;

  let component = null;

  switch (inputType) {
    case INPUT_TYPE.TEXT:
      component = (
        <StyledInput
          id={id}
          type={props.type}
          maxLength={props.maxLength}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      );
      break;
    case INPUT_TYPE.SELECT:
      component = (
        <StyledSelect
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        >
          <option value=""></option>
          {props.options.map((item: T) => (
            <option key={item[props.uniqueKey]} value={item[props.uniqueKey]}>
              {item[props.uniqueKey]}
            </option>
          ))}
        </StyledSelect>
      );
      break;
    case INPUT_TYPE.CUSTOM:
      component = props.children;
      break;
    default:
      invariant(false, "FormInput is not of type TEXT, SELECT, or CUSTOM!");
  }

  return (
    <FormControl label={label} isInvalid={!!error} isDisabled={disabled}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {component}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
