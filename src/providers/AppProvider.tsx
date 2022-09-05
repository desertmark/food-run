import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface AppState {
  globalLoading: boolean;
  setGlobalLoading?: (loading: boolean) => void;
}

const AppContext = createContext<AppState>({ globalLoading: false });

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </AppContext.Provider>
  );
};
