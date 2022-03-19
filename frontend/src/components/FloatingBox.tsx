import { ReactNode } from "react";
import { Box, StyleProps } from "@chakra-ui/react";

type Props = StyleProps & {
  children: ReactNode;
};

export default function FloatingBox(props: Props) {
  const { children } = props;

  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      {...props}
    >
      {children}
    </Box>
  );
}
