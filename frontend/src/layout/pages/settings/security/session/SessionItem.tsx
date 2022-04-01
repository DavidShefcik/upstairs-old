import { ReactChild } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  AccordionIcon,
  Flex,
  VStack,
  Stack,
  Button,
} from "@chakra-ui/react";
import { IconProps, Icon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { MdDesktopWindows, MdPhoneIphone } from "react-icons/md";
import { DateTime } from "luxon";

import { Session, SESSION_DEVICE_TYPE } from "~/types/session";
import useDeviceSize from "~/hooks/useDeviceSize";

interface SessionValueProps {
  label: string;
  value?: string;
  children?: ReactChild;
}
interface SessionItemProps {
  session: Session;
  onDelete(): void;
  deleteSessionLoading: boolean;
}

const DEVICE_ICON_PROPS: IconProps = {
  width: 6,
  height: 6,
  color: "brand.100",
};

function SessionValue({ label, value, children }: SessionValueProps) {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Text
        fontSize="sm"
        fontStyle="italic"
        fontWeight="bold"
        color="brand.100"
      >
        {label}
      </Text>
      {value && <Text>{value}</Text>}
      {children && children}
    </Flex>
  );
}

export default function SessionItem({
  session,
  onDelete,
  deleteSessionLoading,
}: SessionItemProps) {
  const {
    isCurrentSession,
    ipAddress,
    lastLoggedInAt,
    approximateLocation,
    deviceType,
  } = session;

  const { isMobile } = useDeviceSize();

  let deviceTypeIcon = <></>;
  let tooltipText = "";
  switch (deviceType) {
    case SESSION_DEVICE_TYPE.DESKTOP:
      deviceTypeIcon = <Icon {...DEVICE_ICON_PROPS} as={MdDesktopWindows} />;
      tooltipText = "Website";
      break;
    case SESSION_DEVICE_TYPE.MOBILE:
      deviceTypeIcon = <Icon {...DEVICE_ICON_PROPS} as={MdPhoneIphone} />;
      tooltipText = "Mobile App";
      break;
    default:
      deviceTypeIcon = <QuestionOutlineIcon {...DEVICE_ICON_PROPS} />;
      tooltipText = "Unknown";
      break;
  }

  return (
    <AccordionItem width="100%">
      {/* Toggle button */}
      <AccordionButton>
        <Flex width="100%" justifyContent="space-between">
          <Text
            fontStyle="italic"
            fontWeight="bold"
            color={isCurrentSession ? "brand.100" : "gray.800"}
          >
            {ipAddress}
            {isCurrentSession && <sup>*</sup>}
          </Text>
          <AccordionIcon />
        </Flex>
      </AccordionButton>
      {/* Content */}
      <AccordionPanel borderTop="1px" borderColor="gray.200">
        <VStack spacing="4">
          {/* Current session text */}
          {isCurrentSession && (
            <Text
              width="100%"
              textAlign="left"
              fontStyle="italic"
              fontWeight="bold"
              color="brand.100"
            >
              Current session
            </Text>
          )}
          {/* IP address and location */}
          <Stack
            width="100%"
            spacing="4"
            direction={isMobile ? "column" : "row"}
          >
            <SessionValue label="IP Address" value={ipAddress} />
            <SessionValue label="Location" value={approximateLocation} />
          </Stack>
          {/* Last logged in and device type */}
          <Stack
            width="100%"
            spacing="4"
            direction={isMobile ? "column" : "row"}
          >
            <SessionValue
              label="Last Logged In"
              value={DateTime.fromJSDate(lastLoggedInAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            />
            <SessionValue label="Device Type">{deviceTypeIcon}</SessionValue>
          </Stack>
          {/* Logout button */}
          <Button
            colorScheme="red"
            disabled={deleteSessionLoading}
            width={isMobile ? "100%" : "45%"}
            alignSelf="flex-start"
          >
            Logout
          </Button>
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}
