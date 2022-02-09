import { FormEvent, ReactNode } from "react";
import { Flex, VStack, Text, Button } from "@chakra-ui/react";

import useIsMobile from "~/hooks/useIsMobile";

interface Props {
  title: string;
  isSubmitting: boolean;
  children: ReactNode;
  onSubmit(): Promise<void>;
}

const MOBILE_CONTAINER_WIDTH = "80%";
const DESKTOP_CONTAINER_WIDTH = "40%";

export default function BaseAuthentication({
  title,
  isSubmitting,
  children,
  onSubmit,
}: Props) {
  const isMobile = useIsMobile();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit();
  };

  return (
    <Flex
      flex="1"
      backgroundColor="brand.100"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing="5"
        backgroundColor="gray.100"
        width={isMobile ? MOBILE_CONTAINER_WIDTH : DESKTOP_CONTAINER_WIDTH}
        borderRadius="5"
        padding="8"
        boxShadow="lg"
      >
        <Text
          fontSize="2xl"
          color="brand.100"
          fontWeight="bold"
          fontStyle="italic"
        >
          {title}
        </Text>
        <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing="5" width="100%">
            {children}
            <Button type="submit" isLoading={isSubmitting} colorScheme="brand">
              {title}
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
}
