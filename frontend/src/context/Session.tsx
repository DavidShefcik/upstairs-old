import { createContext, useContext } from "react";

export interface ISessionContext {
  user: User | null;
  isLoggedIn: boolean;
  login(user: User): void;
  logout(): Promise<boolean>;
}

const SessionContext = createContext<ISessionContext>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: async () => false,
});

export function useSessionContext(): ISessionContext {
  const values = useContext(SessionContext);

  return values;
}

export default SessionContext;
