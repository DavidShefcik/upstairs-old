import { createContext, useContext } from "react";

export interface ISessionContext {
  user: User | null;
  isLoggedIn: boolean;
  login(user: User): void;
  logout(): Promise<void>;
}

const SessionContext = createContext<ISessionContext>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: async () => {},
});

export function useSessionContext(): ISessionContext {
  const values = useContext(SessionContext);

  return values;
}

export default SessionContext;
