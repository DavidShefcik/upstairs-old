import { Button, Flex, VStack, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

const ICON_SIZE = 16;

interface Props {
  title: string;
  subtitle: string;
  icon: typeof Icon;
  onButtonClick?(): void;
  buttonText?: string;
}

export default function ErrorPage({
  title,
  subtitle,
  icon: IconComponent,
  onButtonClick,
  buttonText = "Back to Safety",
}: Props) {
  return (
    <Flex
      flexDirection="column"
      flex="1"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing="8">
        <VStack spacing="6">
          <Text fontSize="4xl">{title}</Text>
          <IconComponent
            color="brand.100"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
          <Text fontSize="lg" fontWeight="bold">
            {subtitle}
          </Text>
        </VStack>
        {onButtonClick && (
          <Button colorScheme="brand" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </VStack>
    </Flex>
  );
}
