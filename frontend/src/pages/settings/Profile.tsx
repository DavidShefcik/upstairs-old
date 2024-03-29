import { Text } from "@chakra-ui/react";

import SettingsContent from "~/layout/pages/settings/SettingsContent";
import FormSettingsSection from "~/layout/pages/settings/FormSettingsSection";

/**
 * TODO: Make this an interactive profile header view. Same
 * basic floating box with save and cancel buttons like the
 * other sections. Profile header has text box on name,
 * text area on bio, upload photo on profile picture and banner
 * hover. Hint text at bottom mentioning tap on images to update
 * them
 */

export default function ProfileSettings() {
  return (
    <SettingsContent title="Profile Settings">
      {/* <FormSettingsSection title="Update profile details"> */}
      {/* Profile picture */}
      {/* Banner picture */}
      {/* Bio */}
      <Text>TODO</Text>
      {/* </FormSettingsSection> */}
    </SettingsContent>
  );
}

// <Flex width="100%" justifyContent="center" alignItems="center">
//         <Stack flex={1} spacing="4" direction={isMobile ? "column" : "row"}>
//           {/* First name */}
//           <FormControl
//             label="First Name"
//             isInvalid={!!firstNameError}
//             isDisabled={updateAccountLoading}
//             flex={1}
//           >
//             <FormLabel htmlFor="firstName">First Name</FormLabel>
//             <StyledInput
//               id="firstName"
//               type="text"
//               maxLength={INPUT_SETTINGS.name.maxLength}
//               value={firstName}
//               onChange={(event) => setFirstName(event.target.value)}
//             />
//             {firstNameError && (
//               <FormErrorMessage>{firstNameError}</FormErrorMessage>
//             )}
//           </FormControl>
//           {/* Last name */}
//           <FormControl
//             label="Last Name"
//             isInvalid={!!lastNameError}
//             isDisabled={updateAccountLoading}
//             flex={1}
//           >
//             <FormLabel htmlFor="lastName">Last Name</FormLabel>
//             <StyledInput
//               id="lastName"
//               type="text"
//               maxLength={INPUT_SETTINGS.name.maxLength}
//               value={lastName}
//               onChange={(event) => setLastName(event.target.value)}
//             />
//             {lastNameError && (
//               <FormErrorMessage>{lastNameError}</FormErrorMessage>
//             )}
//           </FormControl>
//         </Stack>
//       </Flex>
