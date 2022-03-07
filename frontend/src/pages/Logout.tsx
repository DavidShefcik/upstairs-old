import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import FullPageLoading from "~/layout/FullPageLoading";
import { useSessionContext } from "~/context/Session";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useSessionContext();

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await logout();
        navigate("/");
      }
    })();
  }, []);

  return (
    <Flex flexDirection="column" flex="1">
      <FullPageLoading text="Please wait..." />
    </Flex>
  );
}
