import { Flex, Text, Spinner } from "@chakra-ui/react";

interface Props {
  text: string;
}

export default function FullPageLoading({ text }: Props) {
  return (
    <Flex
      backgroundColor="brand.100"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Spinner color="gray.100" size="xl" />
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
