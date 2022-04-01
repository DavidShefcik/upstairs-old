import { useNavigate } from "react-router-dom";
import { Button, Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import NiceModal from "@ebay/nice-modal-react";

import { useSessionContext } from "~/context/Session";
import BaseSettingsSection from "~/layout/pages/settings/BaseSettingsSection";
import useDeviceSize from "~/hooks/useDeviceSize";
import ConfirmModal from "~/layout/modals/ConfirmModal";
import { Session, SESSION_DEVICE_TYPE } from "~/types/session";
import SessionList from "./session/SessionList";

const TEMP_SESSION_DATA: Session[] = [
  {
    id: "1",
    deviceType: SESSION_DEVICE_TYPE.DESKTOP,
    approximateLocation: "Chicago, IL",
    ipAddress: "192.168.12.87",
    lastLoggedInAt: new Date(),
  },
  {
    id: "2",
    deviceType: SESSION_DEVICE_TYPE.MOBILE,
    approximateLocation: "New York City, NY",
    ipAddress: "192.168.65.24",
    lastLoggedInAt: new Date(),
  },
  {
    id: "3",
    deviceType: SESSION_DEVICE_TYPE.UNKNOWN,
    approximateLocation: "Miami, FL",
    ipAddress: "192.168.199.102",
    lastLoggedInAt: new Date(),
  },
  {
    id: "4",
    deviceType: SESSION_DEVICE_TYPE.DESKTOP,
    approximateLocation: "Napervile, IL",
    ipAddress: "192.168.1.2",
    lastLoggedInAt: new Date(),
    isCurrentSession: true,
  },
];

const DELETE_SESSIONS_MUTATION = gql`
  mutation DeleteSessionMutation($sessionIds: [String]) {
    deleteSession(sessionIds: $sessionIds) {
      success {
        sessionId
      }
      failed {
        sessionId
      }
    }
  }
`;
const GET_ALL_SESSIONS_QUERY = gql`
  query GetAllSessions {
    sessions {
      id
      ipAddress
      approximateLocation
      lastLoggedInAt
      deviceType
      isCurrentSession
    }
  }
`;

export default function SessionManagement() {
  const { user, logout } = useSessionContext();
  const { isMobile } = useDeviceSize();
  const navigate = useNavigate();

  const [
    sendData,
    { loading: deleteSessionLoading, error: deleteSessionError },
  ] = useMutation(DELETE_SESSIONS_MUTATION);
  // TODO: Make this a subscription
  const {
    data,
    loading: getSessionsLoading,
    error: getSessionError,
    refetch: fetchSessions,
  } = useQuery(GET_ALL_SESSIONS_QUERY);

  const logoutAllDevicesSuccess = async () => {
    await logout();

    navigate("/");
  };
  const handleSessionDelete = async (sessionId: string[]) => {};

  const handleLogoutAllDevices = () => {
    NiceModal.show(ConfirmModal, {
      title: "Logout All Devices",
      message:
        "Are you sure you want to logout all devices? This will log you out of the current session. It may take up to 15 minutes for the logout to take effect.",
      onConfirm: () => handleSessionDelete([]),
      onSuccess: logoutAllDevicesSuccess,
      submitButtonColorScheme: "red",
    });
  };

  let component = null;
  if (getSessionsLoading) {
    component = (
      <Flex width="100%" justifyContent="center" alignItems="center" py="4">
        <Spinner color="brand.100" size="md" />
      </Flex>
    );
  } else if (getSessionError || !data || !data.sessions) {
    component = (
      <VStack
        width="100%"
        justifyContent="center"
        alignItems="center"
        spacing="4"
        py="4"
      >
        <Text>Failed to get sessions</Text>
        <Button colorScheme="brand" onClick={() => fetchSessions()}>
          Try Again
        </Button>
      </VStack>
    );
  } else if (data && data.sessions && data.sessions.length === 0) {
    component = (
      <Flex width="100%" justifyContent="center" alignItems="center" py="4">
        <Text>No sessions available. How did you get here?</Text>
      </Flex>
    );
  } else {
    component = (
      <SessionList
        sessions={TEMP_SESSION_DATA}
        onDelete={handleSessionDelete}
      />
    );
  }

  return (
    <BaseSettingsSection title="Manage sessions">
      <>
        {/* Logout all devices button */}
        <Button
          colorScheme="red"
          onClick={() => handleLogoutAllDevices()}
          isLoading={deleteSessionLoading}
          disabled={getSessionsLoading}
          width={isMobile ? "100%" : "auto"}
          marginBottom="4"
        >
          Logout all devices
        </Button>
        {/* Session list */}
        {component}
      </>
    </BaseSettingsSection>
  );
}
