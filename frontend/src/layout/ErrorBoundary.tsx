import { ReactChild, Component } from "react";
import { Flex } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import ErrorPage from "./ErrorPage";

interface Props {
  children: ReactChild;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // TODO: Logging service with componentDidCatch when not running locally

  render() {
    if (this.state.hasError) {
      return (
        <Flex height="100%">
          <ErrorPage
            title="Error!"
            subtitle="Something unexpected happened."
            icon={WarningIcon}
            buttonText="Try Again"
            onButtonClick={() => location.reload()}
          />
        </Flex>
      );
    }

    return this.props.children;
  }
}
