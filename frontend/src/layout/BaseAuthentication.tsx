import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import _omit from "lodash.omit";

import useDeviceSize from "~/hooks/useDeviceSize";
import { ILink } from "~/constants/links";

interface Props {
  title: string;
  children: ReactNode;
  links?: ILink[];
}

const MOBILE_CONTAINER_WIDTH = "93%";
const DESKTOP_CONTAINER_WIDTH = "450px";
const MOBILE_FORM_PADDING_X = "4";
const DESKTOP_FORM_PADDING_X = "8";

/**
 * T is an interface containing the names of the
 * inputs as key value pairs. R is the type of
 * the response when the mutation is successful
 */
export default function BaseAuthentication({ title, children, links }: Props) {
  const { isMobile } = useDeviceSize();

  return (
    <Flex
      flex="1"
      backgroundColor="brand.100"
      justifyContent="center"
      alignItems="center"
      paddingY="50"
    >
      <VStack
        spacing="5"
        backgroundColor="gray.100"
        width={isMobile ? MOBILE_CONTAINER_WIDTH : DESKTOP_CONTAINER_WIDTH}
        borderRadius="5"
        paddingY="8"
        paddingX={isMobile ? MOBILE_FORM_PADDING_X : DESKTOP_FORM_PADDING_X}
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
        {children}
        <VStack spacing="2">
          {links?.map(({ path, text }) => (
            <ChakraLink
              key={path}
              as={Link}
              to={path}
              title={text}
              color="brand"
            >
              {text}
            </ChakraLink>
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
}
