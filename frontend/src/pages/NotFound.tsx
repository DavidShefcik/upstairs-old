import { useNavigate } from "react-router-dom";
import { Flex, VStack, Text, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const WARNING_ICON_SIZE = 16;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection="column"
      flex="1"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing="8">
        <VStack spacing="6">
          <Text fontSize="4xl">404</Text>
          <WarningIcon
            color="brand.100"
            width={WARNING_ICON_SIZE}
            height={WARNING_ICON_SIZE}
          />
          <Text fontSize="lg" fontWeight="bold">
            That page was not found!
          </Text>
        </VStack>
        <Button colorScheme="brand" onClick={() => navigate("/")}>
          Back to Safety
        </Button>
      </VStack>
    </Flex>
  );
}
