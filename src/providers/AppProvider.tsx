import { StatusBarStyle } from "expo-status-bar";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface AppState {
  globalLoading: boolean;
  statusBarStyle: StatusBarStyle;
  setStatusBarStyle: (style: StatusBarStyle) => void;
  setGlobalLoading?: (loading: boolean) => void;
}

const AppContext = createContext<AppState>({
  globalLoading: false,
  statusBarStyle: "dark",
} as AppState);

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(true);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>("dark");

  return (
    <AppContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        statusBarStyle,
        setStatusBarStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
