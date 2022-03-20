import { FormEvent, Dispatch, SetStateAction, ReactNode } from "react";
import { VStack, Button } from "@chakra-ui/react";
import { ApolloError, DocumentNode, useMutation } from "@apollo/client";
import _omit from "lodash.omit";

import { isValidString } from "~/utils/strings";

type FormErrors<T> = Record<keyof Partial<T>, Dispatch<SetStateAction<string>>>;
interface FormField {
  fieldName: string;
  isRequired: boolean;
}

export interface FormProps<T, R> {
  submitButtonText?: string;
  children: ReactNode;
  data: T;
  fields: Record<keyof T, FormField>;
  mutation: DocumentNode;
  setErrors: FormErrors<T>;
  isSubmitting?: boolean;
  setIsSubmitting?: Dispatch<SetStateAction<boolean>>;
  onError(error: ApolloError): void;
  customValidation?(): boolean;
  onSuccess?(data: R): void;
  extraMutationVariables?: Record<string, string | number | boolean>;
  showSubmitButton?: boolean;
}

/**
 * T is an interface containing the names of the
 * inputs as key value pairs. R is the type of
 * the response when the mutation is successful
 */
export default function Form<
  T extends { [K in keyof T]: string },
  R = undefined
>({
  submitButtonText = "Submit",
  children,
  data,
  fields,
  mutation,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onError,
  customValidation,
  onSuccess,
  extraMutationVariables,
  showSubmitButton,
}: FormProps<T, R>) {
  const [sendData, { loading }] = useMutation(mutation);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting && setIsSubmitting(true);
    setAllErrors("");

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

      setIsSubmitting && setIsSubmitting(false);

      return;
    }

    // Custom validation. We are already guaranteed that the required inputs are not blank
    if (customValidation && !customValidation()) {
      setIsSubmitting && setIsSubmitting(false);

      return;
    }

    await sendData({
      variables: {
        ...data,
        ...extraMutationVariables,
      },
      onCompleted: (data: R) => {
        setIsSubmitting && setIsSubmitting(false);

        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        setIsSubmitting && setIsSubmitting(false);

        onError(error);
      },
    });
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
        const errMessage = errors[key];

        if (errMessage !== undefined) {
          setErrors[key](errMessage);
        }
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <VStack spacing="5" width="100%">
        {children}
        {showSubmitButton && (
          <Button
            type="submit"
            isLoading={loading || isSubmitting}
            colorScheme="brand"
            width="100%"
          >
            {submitButtonText}
          </Button>
        )}
      </VStack>
    </form>
  );
}
