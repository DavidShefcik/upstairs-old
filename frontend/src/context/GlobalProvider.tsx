import { ReactNode, useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { gql, useQuery, useMutation } from "@apollo/client";

import SessionContext from "./Session";
import { CURRENT_USER_FRAGMENT } from "~/fragments/user";
import FullPageLoading from "~/layout/FullPageLoading";

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
interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

const GET_USER_QUERY = gql`
  ${CURRENT_USER_FRAGMENT}
  query GetCurrentUser {
    currentUser {
      ...CurrentUser
    }
  }
`;
const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      success
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

  const [userLoading, setUserLoading] = useState(true);

  // Session
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [requestLogout, { loading: logoutLoading, error: logoutError }] =
    useMutation(LOGOUT_MUTATION);

  // Check session
  const {
    error: getUserError,
    data: getUserData,
    refetch: refetchUserData,
  } = useQuery(GET_USER_QUERY, {
    skip: true,
    onCompleted: ({ currentUser }: GetCurrentUserResponse) => {
      if (currentUser) {
        login(currentUser);
      } else if (!currentUser && (isLoggedIn || user)) {
        clearSessionState();
      }
    },
    onError: async () => {
      if (isLoggedIn || user) {
        await clearSessionState();
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        await refetchUserData();
      } catch {}

      setUserLoading(false);
    })();
  }, []);

  useEffect(() => {
    const newAllLoading = [userLoading].some((val) => val);

    setAllLoading(newAllLoading);
  }, [userLoading, setAllLoading]);

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
    return await new Promise<boolean>(async (resolve) => {
      await requestLogout({
        onCompleted: (data: LogoutResponse) => {
          const { success } = data.logout;

          if (success) {
            clearSessionState();

            resolve(true);
          } else {
            // TODO: Banner at the top of site showing error

            resolve(false);
          }
        },
        onError: () => {
          // TODO: Banner at the top of site showing error

          resolve(false);
        },
      });
    });
  };
  const clearSessionState = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (allLoading) return <FullPageLoading text="Loading..." />;
  if (unrecoverableError) return <Error />;

  return (
    <SessionContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
