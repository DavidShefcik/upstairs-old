import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  SelectProps,
  SwitchProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import invariant from "invariant";
import _omit from "lodash.omit";

import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelectInput";
import StyledPinInput, { StyledPinInputProps } from "./StyledPinInput";
import StyledSwitch from "./StyledSwitchInput";

export enum INPUT_TYPE {
  TEXT,
  SELECT,
  PIN,
  TOGGLE,
  CUSTOM,
}

const INLINE_INPUT_TYPES: INPUT_TYPE[] = [INPUT_TYPE.TOGGLE];

interface ControlledInput<T extends string | boolean = string> {
  value: T;
  onChange(value: T): void;
}

type Props<T> = {
  id: string;
  label: string;
  error: string;
  disabled: boolean;
  /**
   * Name is required for the form component
   * to deal with the input
   */
  name: string;
} & (
  | ({
      inputType: INPUT_TYPE.TEXT;
      maxLength: number;
    } & Omit<InputProps, "value" | "onChange"> &
      ControlledInput)
  | ({
      inputType: INPUT_TYPE.SELECT;
      options: T[];
      uniqueKey: keyof T;
    } & Omit<SelectProps, "value" | "onChange"> &
      ControlledInput)
  | ({
      inputType: INPUT_TYPE.PIN;
    } & Omit<StyledPinInputProps, "value" | "onChange"> &
      ControlledInput)
  | ({
      inputType: INPUT_TYPE.TOGGLE;
    } & Omit<SwitchProps, "checked" | "value" | "onChange"> &
      ControlledInput<boolean>)
  | {
      inputType: INPUT_TYPE.CUSTOM;
      children: ReactNode;
    }
);

export default function FormInput<T extends Record<string, string> = {}>(
  props: Props<T>
) {
  const { id, label, error, disabled, inputType } = props;

  let component = null;

  switch (inputType) {
    case INPUT_TYPE.TEXT:
      component = (
        <StyledInput
          {...props}
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
          {...props}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          id={props.id}
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
    case INPUT_TYPE.TOGGLE:
      /**
       * We have to remove the value prop due to our ControlledInput
       * value type interfering with the value prop on the chakra
       * Switch component
       */
      const propsWithoutValueHandling = _omit(props, [
        "value",
        "onChange",
        "inputType",
      ]);

      component = (
        <StyledSwitch
          {...propsWithoutValueHandling}
          isChecked={props.value}
          onChange={(event) => props.onChange(event.target.checked)}
        />
      );
      break;
    case INPUT_TYPE.PIN:
      component = <StyledPinInput {...props} />;
      break;
    case INPUT_TYPE.CUSTOM:
      component = props.children;
      break;
    default:
      invariant(
        false,
        "FormInput is not of type TEXT, SELECT, PIN, SWITCH, or CUSTOM!"
      );
  }

  return (
    <FormControl label={label} isInvalid={!!error} isDisabled={disabled}>
      <Flex
        flex={1}
        flexDirection={
          INLINE_INPUT_TYPES.includes(inputType) ? "row" : "column"
        }
        justifyContent={
          INLINE_INPUT_TYPES.includes(inputType) ? "space-between" : "center"
        }
      >
        <FormLabel htmlFor={id} flex={1}>
          {label}
        </FormLabel>
        <Box>{component}</Box>
      </Flex>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
