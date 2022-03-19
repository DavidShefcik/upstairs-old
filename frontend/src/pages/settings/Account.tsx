import { useState } from "react";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

import SettingsContent from "~/layout/pages/settings/SettingsContent";
import UpdateEmail from "~/layout/pages/settings/account/UpdateEmail";
import UpdateAddress from "~/layout/pages/settings/account/UpdateAddress";
import DangerZone from "~/layout/pages/settings/account/DangerZone";

export default function AccountSettings() {
  // const [
  //   requestAccountUpdate,
  //   { loading: updateAccountLoading, error: updateAccountError },
  // ] = useMutation(UPDATE_ACCOUNT_MUTATION, {
  //   variables: {
  //     firstName,
  //     lastName,
  //     streetAddress,
  //     cityAddress,
  //     zipCodeAddress,
  //   },
  // });

  return (
    <SettingsContent title="Account Settings">
      <UpdateEmail />
      <UpdateAddress />
      <DangerZone />
    </SettingsContent>
  );
}
