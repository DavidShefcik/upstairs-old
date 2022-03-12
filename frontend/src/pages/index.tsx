import { useNavigate, Navigate } from "react-router-dom";
import { Box, Flex, Text, VStack, Stack, Button } from "@chakra-ui/react";

import PageWidth from "~/layout/PageWidth";
import { useSessionContext } from "~/context/Session";
import useDeviceSize from "~/hooks/useDeviceSize";

export default function HomePage() {
  const { isLoggedIn } = useSessionContext();
  const { isMobile } = useDeviceSize();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <Flex flexGrow={1} flexDirection="column">
      {/* Landing text */}
      <Flex
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="brand.100"
        paddingY={isMobile ? "8" : "0"}
      >
        <PageWidth mx="2">
          <Stack
            width="100%"
            spacing={isMobile ? "16" : "32"}
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Text */}
            <Box>
              <VStack spacing="4">
                <Text
                  color="gray.100"
                  fontSize="3xl"
                  fontWeight="bold"
                  fontStyle="italic"
                  width="100%"
                  textAlign={isMobile ? "center" : "left"}
                >
                  Tap into your neighborhood
                </Text>
                <Text
                  color="gray.100"
                  width="100%"
                  textAlign={isMobile ? "center" : "left"}
                >
                  Connect with your neighbors, organize events, share news, and
                  more!
                </Text>
              </VStack>
            </Box>
            {/* Screenshot */}
            <Flex
              width={isMobile ? "100%" : "96"}
              height={isMobile ? "72" : "96"}
              borderRadius="md"
              shadow="md"
              backgroundColor="white"
              padding="8"
              justifyContent="center"
              alignItems="center"
            >
              <Text>TODO: Screenshot</Text>
            </Flex>
          </Stack>
        </PageWidth>
      </Flex>
      {/* Buttons */}
      <Flex flex={2} justifyContent="center" alignItems="center">
        <VStack spacing="6" py="10">
          <Button
            colorScheme="brand"
            width="64"
            py="6"
            title="Join your Neighbors"
            onClick={() => navigate("/register")}
          >
            Join your Neighbors
          </Button>
          <Button
            colorScheme="brand"
            width="64"
            py="6"
            title="Neighborhood Directory"
            onClick={() => navigate("/neighborhoods")}
          >
            Neighborhood Directory
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
