import { ReactNode, useEffect, useState } from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { gql, useQuery } from "@apollo/client";

import SessionContext from "./Session";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";

interface GlobalProviderProps {
  children: ReactNode;
}
interface StatusProps {
  text: string;
  children: ReactNode;
}

interface GetCurrentUserResponse {
  currentUser: User;
}

const GET_USER_QUERY = gql`
  ${CURRENT_USER_FRAGMENT}
  query GetCurrentUser {
    currentUser {
      ...CurrentUser
    }
  }
`;
const ICON_SIZE = 16;

function Status({ text, children }: StatusProps) {
  return (
    <Flex
      backgroundColor="brand.100"
      height="100%"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {children}
      <Text
        fontSize="xl"
        color="gray.100"
        marginY="8"
        fontWeight="bold"
        fontStyle="italic"
      >
        {text}
      </Text>
    </Flex>
  );
}
function Loading() {
  return (
    <Status text="Loading...">
      <Spinner color="gray.100" size="xl" />
    </Status>
  );
}
function Error() {
  return (
    <Status text="Error!">
      <WarningIcon color="gray.100" width={ICON_SIZE} height={ICON_SIZE} />
    </Status>
  );
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [allLoading, setAllLoading] = useState(true);
  const [unrecoverableError, setUnrecoverableError] = useState(false);

  // Session
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session
  const {
    loading: getUserLoading,
    error: getUserError,
    data: getUserData,
    refetch: refetchUserData,
  } = useQuery(GET_USER_QUERY, {
    skip: true,
    onCompleted: ({ currentUser }: GetCurrentUserResponse) => {
      if (currentUser) {
        login(currentUser);
      } else if (!currentUser && (isLoggedIn || user)) {
        logout();
      }
    },
    onError: () => {
      logout();
    },
  });

  useEffect(() => {
    (async () => {
      await refetchUserData().catch(() => {});
    })();
  }, []);

  useEffect(() => {
    const newAllLoading = [getUserLoading].some((val) => val);

    setAllLoading(newAllLoading);
  }, [getUserLoading, setAllLoading]);

  // useEffect(() => {
  // Errors that prevent the site from loading should
  // be checked here
  // const allHaveErrors = [].every((err) => err);
  // setUnrecoverableError(allHaveErrors);
  // }, [getUserError]);

  const login = (newUser: User) => {
    setUser(newUser);
    setIsLoggedIn(true);
  };
  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (allLoading) return <Loading />;
  if (unrecoverableError) return <Error />;

  return (
    <SessionContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
