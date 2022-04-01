import { Accordion, Flex, Text } from "@chakra-ui/react";

import { Session } from "~/types/session";
import SessionItem from "./SessionItem";

interface Props {
  sessions: Session[];
  onDelete(sessionId: string[]): void;
  deleteSessionLoading: boolean;
}

export default function SessionList({
  sessions,
  onDelete,
  deleteSessionLoading,
}: Props) {
  return (
    <Flex
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Accordion width="100%" allowToggle allowMultiple>
        {sessions
          .sort(({ isCurrentSession }) => (isCurrentSession ? -1 : 1))
          .map((session) => (
            <SessionItem
              key={session.id}
              {...{ session, deleteSessionLoading }}
              onDelete={() => onDelete([session.id])}
            />
          ))}
      </Accordion>
    </Flex>
  );
}
