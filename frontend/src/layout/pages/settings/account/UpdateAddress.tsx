import { useEffect, useState } from "react";
import { Stack, VStack } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

import SettingsSection from "~/layout/pages/settings/SettingsSection";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";
import useDeviceSize from "~/hooks/useDeviceSize";
import { useSessionContext } from "~/context/Session";
import FormInput, { INPUT_TYPE } from "~/components/inputs/FormInput";
import { INPUT_SETTINGS } from "~/constants/inputs";
import { State, STATES } from "~/constants/states";
import { isValidNumber } from "~/utils/number";
import ZipCodeInput from "~/components/inputs/ZipCodeInput";
import { isValidString } from "~/utils/strings";

const UPDATE_ACCOUNT_MUTATION = gql`
  ${CURRENT_USER_FRAGMENT}
  mutation UpdateAccountMutation(
    $firstName: String
    $lastName: String
    $streetAddress: String
    $cityAddress: String
    $stateAddress: String
    $zipCodeAddress: String
  ) {
    updateAccount(
      firstName: $firstName
      lastName: $lastName
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

  const [
    requestAccountUpdate,
    { loading: updateAddressLoading, error: updateAddressError },
  ] = useMutation(UPDATE_ACCOUNT_MUTATION, {
    variables: {
      streetAddress,
      cityAddress,
      stateAddress,
      zipCodeAddress,
    },
  });

  const setAllErrors = (message: string) => {
    setStreetAddressError(message);
    setCityAddressError(message);
    setStateAddressError(message);
    setZipCodeAddressError(message);
  };

  const handleAddressUpdate = async () => {
    setAllErrors("");

    let hasError = false;

    if (!isValidString(streetAddress)) {
      setStreetAddressError("Street address is required!");

      hasError = true;
    }
    if (!isValidString(cityAddress)) {
      setCityAddressError("City is required!");

      hasError = true;
    }
    if (!isValidString(stateAddress)) {
      setStateAddressError("State is required!");

      hasError = true;
    }
    if (!isValidString(zipCodeAddress)) {
      setZipCodeAddressError("Zip code is required!");

      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Validate zip code
    if (zipCodeAddress.length < 5) {
      setZipCodeAddressError("Zip code is invalid!");

      hasError = true;
    }

    if (hasError) {
      return;
    }

    await requestAccountUpdate();
  };
  const handleCancel = () => {
    setAllErrors("");

    setStreetAddress("");
    setCityAddress("");
    setStateAddress("");
    setZipCodeAddress("");
  };

  useEffect(() => {
    if (updateAddressError) {
      setAllErrors(updateAddressError.message);
    }
  }, [updateAddressError]);

  return (
    <SettingsSection
      title="Update address"
      showButtons
      submitLoading={updateAddressLoading}
      onSubmit={handleAddressUpdate}
      onCancel={handleCancel}
    >
      {/* Address */}
      <VStack spacing="4">
        {/* Street Address */}
        <FormInput
          id="streetAddress"
          label="Street Address"
          inputType={INPUT_TYPE.TEXT}
          maxLength={INPUT_SETTINGS.street_address.maxLength}
          value={streetAddress}
          onChange={(val) => setStreetAddress(val)}
          disabled={updateAddressLoading}
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
            label="City"
            inputType={INPUT_TYPE.TEXT}
            maxLength={INPUT_SETTINGS.city_address.maxLength}
            value={cityAddress}
            onChange={(val) => setCityAddress(val)}
            disabled={updateAddressLoading}
            error={cityAddressError}
          />
          {/* State address */}
          <FormInput<State>
            id="state"
            label="State"
            inputType={INPUT_TYPE.SELECT}
            options={STATES}
            uniqueKey="abbreviation"
            value={stateAddress}
            onChange={(val) => setStateAddress(val)}
            disabled={updateAddressLoading}
            error={stateAddressError}
          />
          {/* Zip code */}
          <FormInput
            id="zipCodeAddress"
            label="Zip Code"
            inputType={INPUT_TYPE.CUSTOM}
            disabled={updateAddressLoading}
            error={zipCodeAddressError}
          >
            <ZipCodeInput
              value={zipCodeAddress}
              onChange={setZipCodeAddress}
              isDisabled={updateAddressLoading}
            />
          </FormInput>
        </Stack>
      </VStack>
    </SettingsSection>
  );
}
