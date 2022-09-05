import { FC } from "react";
import { GlobalLoading } from "./components/GlobalLoading";
import { useApp } from "./providers/AppProvider";
import { Providers } from "./providers/Providers";
import { Navigation } from "./screens/Navigation";
import { StatusBar } from "expo-status-bar";
const App: FC<unknown> = () => {
  const { globalLoading } = useApp();
  return globalLoading ? <GlobalLoading /> : <Navigation />;
};

export default () => (
  <Providers>
    <App />
    <StatusBar />
  </Providers>
);
