import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface IMobileMenuContext {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

export const MobileMenuContext = createContext<IMobileMenuContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useMobileMenuContext(): IMobileMenuContext {
  const values = useContext(MobileMenuContext);

  return values;
}

export default function MobileMenuContextProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{ isOpen, setIsOpen: (val) => setIsOpen(val) }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
