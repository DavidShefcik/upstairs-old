import { Text } from "@chakra-ui/react";

interface Props {
  name: string;
}

export default function Name({ name }: Props) {
  return (
    <Text fontSize="md" colorScheme="brand">
      {name}
    </Text>
  );
}
