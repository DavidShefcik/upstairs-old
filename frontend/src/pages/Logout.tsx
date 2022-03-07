import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import FullPageLoading from "~/layout/FullPageLoading";
import { useSessionContext } from "~/context/Session";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useSessionContext();

  const navigateTimeoutRef = useRef<number>();

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await logout();
      }

      navigateTimeoutRef.current = setTimeout(() => {
        navigate("/");
      }, 500);
    })();

    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Flex flexDirection="column" flex="1">
      <FullPageLoading text="Please wait..." />
    </Flex>
  );
}
