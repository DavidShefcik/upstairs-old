import { useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const CREATE_NAME_MUTATION = gql`
  mutation CreateName($name: String!) {
    createName(name: $name) {
      id
      name
    }
  }
`;

export default function CreateName() {
  const [value, setValue] = useState("");

  const [createName, { loading, error }] = useMutation(CREATE_NAME_MUTATION);

  const handleSubmit = async () => {
    await createName({
      variables: {
        name: value,
      },
    });
    setValue("");
  };

  return (
    <HStack>
      <Input
        placeholder="Name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={128}
        disabled={loading}
      />
      <Button colorScheme="brand" isLoading={loading} onClick={handleSubmit}>
        Submit Name
      </Button>
    </HStack>
  );
}
