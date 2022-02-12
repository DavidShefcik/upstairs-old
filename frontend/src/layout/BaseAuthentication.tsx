import { FormEvent, ReactElement, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  VStack,
  Text,
  Button,
  InputProps,
  FormControlProps,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Link as ChakraLink,
  TextProps,
} from "@chakra-ui/react";
import { DocumentNode, useMutation } from "@apollo/client";

import useIsMobile from "~/hooks/useIsMobile";
import { ILink } from "~/constants/links";
import { isValidString } from "~/utils/strings";

type BaseAuthenticationInputProps = InputProps &
  Omit<FormControlProps, "onChange"> & {
    label: string;
    name: string;
    error: string;
    disabled?: boolean;
  };
type AuthenticationErrors<T> = Record<
  keyof Partial<T>,
  Dispatch<SetStateAction<string>>
>;
interface BaseAuthenticationField {
  fieldName: string;
  isRequired: boolean;
}

interface BaseAuthenticationProps<T, R> {
  title: string;
  children:
    | ReactElement<BaseAuthenticationInputProps & { name: keyof T }>
    | ReactElement<TextProps>
    | Array<
        | ReactElement<BaseAuthenticationInputProps & { name: keyof T }>
        | ReactElement<TextProps>
      >;
  data: T;
  fields: Record<keyof T, BaseAuthenticationField>;
  mutation: DocumentNode;
  setErrors: AuthenticationErrors<T>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onSuccess(data: R): void;
  links?: ILink[];
}

const MOBILE_CONTAINER_WIDTH = "93%";
const DESKTOP_CONTAINER_WIDTH = "33%";
const MOBILE_FORM_PADDING_X = "4";
const DESKTOP_FORM_PADDING_X = "8";

/**
 * T is an interface containing the names of the
 * inputs as key value pairs. R is the type of
 * the response when the mutation is successful
 */
export default function BaseAuthentication<
  T extends { [K in keyof T]: string },
  R = undefined
>({
  title,
  children,
  data,
  fields,
  mutation,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onSuccess,
  links,
}: BaseAuthenticationProps<T, R>) {
  const isMobile = useIsMobile();

  const [sendData, { loading, error }] = useMutation(mutation);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Validate inputs
    const errors: Partial<Record<keyof T, string>> = {};

    // Check if inputs are blank
    for (const field in fields) {
      const { fieldName, isRequired } = fields[field];
      const value = data[field];

      if (isRequired && !isValidString(value)) {
        errors[field] = `${fieldName} is required!`;
      }
    }

    // Set error messages
    if (Object.keys(errors).length > 0) {
      for (const key in errors) {
        const errorMessage = errors[key];

        if (errorMessage) {
          setErrors[key](errorMessage);
        }
      }

      setIsSubmitting(false);

      return;
    }

    try {
      const response = await sendData({
        variables: data,
      });

      setIsSubmitting(false);

      onSuccess(response.data);
    } catch (error) {
      console.log("error", error);

      setAllErrors("Something happened! Please try again.");
      setIsSubmitting(false);
    }
  };

  const setAllErrors = (errorMessage: string) => {
    const errors: Partial<Record<keyof T, string>> = {};

    // Check if inputs are blank
    for (const field in fields) {
      errors[field] = errorMessage;
    }

    // Set error messages
    if (Object.keys(errors).length > 0) {
      for (const key in errors) {
        const errorMessage = errors[key];

        if (errorMessage) {
          setErrors[key](errorMessage);
        }
      }
    }
  };

  return (
    <Flex
      flex="1"
      backgroundColor="brand.100"
      justifyContent="center"
      alignItems="center"
      paddingY="50"
    >
      <VStack
        spacing="5"
        backgroundColor="gray.100"
        width={isMobile ? MOBILE_CONTAINER_WIDTH : DESKTOP_CONTAINER_WIDTH}
        borderRadius="5"
        paddingY="8"
        paddingX={isMobile ? MOBILE_FORM_PADDING_X : DESKTOP_FORM_PADDING_X}
        boxShadow="lg"
      >
        <Text
          fontSize="2xl"
          color="brand.100"
          fontWeight="bold"
          fontStyle="italic"
        >
          {title}
        </Text>
        <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing="5" width="100%">
            {children}
            <Button
              type="submit"
              isLoading={loading || isSubmitting}
              colorScheme="brand"
              width="100%"
            >
              {title}
            </Button>
          </VStack>
        </form>
        <VStack spacing="2">
          {links?.map(({ path, text }) => (
            <ChakraLink key={path} as={Link} to={path} title={text}>
              {text}
            </ChakraLink>
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
}

export function BaseAuthenticationInput(props: BaseAuthenticationInputProps) {
  const { label, name, error, disabled } = props;

  return (
    <FormControl {...props} isInvalid={!!error} isDisabled={disabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...props}
        id={name}
        borderColor="gray.400"
        focusBorderColor="brand.600"
        _hover={{
          borderColor: "gray.500",
        }}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
