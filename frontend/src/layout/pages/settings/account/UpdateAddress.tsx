import { useEffect, useState } from "react";
import { Stack, VStack } from "@chakra-ui/react";
import { ApolloError, gql, useMutation } from "@apollo/client";

import SettingsSection from "~/layout/pages/settings/SettingsSection";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";
import useDeviceSize from "~/hooks/useDeviceSize";
import { useSessionContext } from "~/context/Session";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { State, STATES } from "~/constants/states";
import ZipCodeInput from "~/components/inputs/ZipCodeInput";
import { isValidString } from "~/utils/strings";
import { ErrorMessages, humanReadableErrorMessages } from "~/constants/errors";

const UPDATE_ACCOUNT_MUTATION = gql`
  ${CURRENT_USER_FRAGMENT}
  mutation UpdateAccountMutation(
    $streetAddress: String
    $cityAddress: String
    $stateAddress: String
    $zipCodeAddress: String
  ) {
    updateAccount(
      streetAddress: $streetAddress
      cityAddress: $cityAddress
      stateAddress: $stateAddress
      zipCodeAddress: $zipCodeAddress
    ) {
      success
      user {
        ...CurrentUser
      }
    }
  }
`;

interface UpdateAddressFields {
  streetAddress: string;
  cityAddress: string;
  stateAddress: string;
  zipCodeAddress: string;
}
interface UpdateAddressResponse {
  updateAccount: {
    success: boolean;
    user?: User;
  };
}

export default function UpdateDetails() {
  const { isMobile } = useDeviceSize();
  const { user } = useSessionContext();

  const [streetAddress, setStreetAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [zipCodeAddress, setZipCodeAddress] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityAddressError, setCityAddressError] = useState("");
  const [stateAddressError, setStateAddressError] = useState("");
  const [zipCodeAddressError, setZipCodeAddressError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAllErrors = (message: string) => {
    setStreetAddressError(message);
    setCityAddressError(message);
    setStateAddressError(message);
    setZipCodeAddressError(message);
  };
  const onError = (error: ApolloError) => {
    const { networkError, graphQLErrors } = error;

    if (networkError) {
      setAllErrors(humanReadableErrorMessages["internal-server-error"]);
    } else {
      graphQLErrors.forEach(({ message }) => {
        switch (message) {
          case ErrorMessages.INVALID_ADDRESS:
            setAllErrors(humanReadableErrorMessages[message]);
            break;
          default:
            setAllErrors(humanReadableErrorMessages["internal-server-error"]);
        }
      });
    }
  };
  const handleCancel = () => {
    setAllErrors("");

    setStreetAddress("");
    setCityAddress("");
    setStateAddress("");
    setZipCodeAddress("");
  };
  const customValidation = (): boolean => {
    // Validate zip code
    if (zipCodeAddress.length < 5) {
      setZipCodeAddressError("Zip code is invalid!");

      return false;
    } else {
      return true;
    }
  };

  return (
    <SettingsSection<UpdateAddressFields, UpdateAddressResponse>
      {...{ isSubmitting, setIsSubmitting }}
      title="Update address"
      showButtons
      setErrors={{
        streetAddress: setStreetAddressError,
        cityAddress: setCityAddressError,
        stateAddress: setStateAddressError,
        zipCodeAddress: setZipCodeAddressError,
      }}
      data={{
        streetAddress,
        cityAddress,
        stateAddress,
        zipCodeAddress,
      }}
      fields={{
        streetAddress: {
          fieldName: "Street address",
          isRequired: true,
        },
        cityAddress: {
          fieldName: "City",
          isRequired: true,
        },
        stateAddress: {
          fieldName: "State",
          isRequired: true,
        },
        zipCodeAddress: {
          fieldName: "Zip code",
          isRequired: true,
        },
      }}
      mutation={UPDATE_ACCOUNT_MUTATION}
      onError={onError}
      onCancel={handleCancel}
      customValidation={customValidation}
    >
      {/* Address */}
      <VStack spacing="4">
        {/* Street Address */}
        <FormInput
          id="streetAddress"
          name="streetAddress"
          label="Street Address"
          inputType={INPUT_TYPE.TEXT}
          maxLength={INPUT_SETTINGS.street_address.maxLength}
          value={streetAddress}
          onChange={(val) => setStreetAddress(val)}
          disabled={isSubmitting}
          error={streetAddressError}
        />
        <Stack
          flex={1}
          spacing="4"
          width="100%"
          direction={isMobile ? "column" : "row"}
        >
          {/* City Address */}
          <FormInput
            id="cityAddress"
            name="cityAddress"
            label="City"
            inputType={INPUT_TYPE.TEXT}
            maxLength={INPUT_SETTINGS.city_address.maxLength}
            value={cityAddress}
            onChange={(val) => setCityAddress(val)}
            disabled={isSubmitting}
            error={cityAddressError}
          />
          {/* State address */}
          <FormInput<State>
            id="state"
            name="stateAddress"
            label="State"
            inputType={INPUT_TYPE.SELECT}
            options={STATES}
            uniqueKey="abbreviation"
            value={stateAddress}
            onChange={(val) => setStateAddress(val)}
            disabled={isSubmitting}
            error={stateAddressError}
          />
          {/* Zip code */}
          <FormInput
            id="zipCodeAddress"
            name="zipCodeAddress"
            label="Zip Code"
            inputType={INPUT_TYPE.CUSTOM}
            disabled={isSubmitting}
            error={zipCodeAddressError}
          >
            <ZipCodeInput
              value={zipCodeAddress}
              onChange={setZipCodeAddress}
              isDisabled={isSubmitting}
            />
          </FormInput>
        </Stack>
      </VStack>
    </SettingsSection>
  );
}
