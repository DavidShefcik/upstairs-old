import { gql, useQuery } from "@apollo/client";
import { Spinner, Text, Button } from "@chakra-ui/react";

import CreateName from "~/components/names/CreateName";
import Name from "~/components/names/Name";
import PageWidth from "~/layout/PageWidth";
import { useSessionContext } from "~/context/Session";
import useDeviceSize from "~/hooks/useDeviceSize";

interface NamesQueryResult {
  allNames: Name[];
}

const GET_NAMES_QUERY = gql`
  query GetNames {
    allNames {
      id
      name
    }
  }
`;

export default function HomePage() {
  const { data, loading, error, refetch } =
    useQuery<NamesQueryResult>(GET_NAMES_QUERY);
  const { isMobile } = useDeviceSize();
  const { isLoggedIn } = useSessionContext();

  const handleRefetch = async () => {
    await refetch();
  };

  if (loading) return <Spinner colorScheme="brand" />;
  if (error) return <Text>Error!</Text>;

  return (
    <PageWidth>
      <p>Is Mobile: {isMobile.toString()}</p>
      <CreateName />
      <Button colorScheme="brand" onClick={handleRefetch}>
        Refetch
      </Button>
      {data?.allNames.map((name: any) => (
        <Name key={name.id} name={name.name} />
      ))}
      {isLoggedIn ? <p>Logged in</p> : <p>Not logged in</p>}
    </PageWidth>
  );
}
