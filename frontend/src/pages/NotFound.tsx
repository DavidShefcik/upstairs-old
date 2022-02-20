import { useNavigate } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";

import ErrorPage from "~/layout/ErrorPage";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <ErrorPage
      title="404"
      subtitle="That page was not found!"
      icon={WarningIcon}
      onButtonClick={() => navigate("/")}
    />
  );
}
