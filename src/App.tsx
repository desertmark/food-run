import { FC } from "react";
import { GlobalLoading } from "./components/GlobalLoading";
import { useApp } from "./providers/AppProvider";
import { Providers } from "./providers/Providers";
import { Navigation } from "./screens/Navigation";
import { StatusBar } from "expo-status-bar";
import { useLogoFont } from "./config/Theme";
const App: FC<unknown> = () => {
  const { globalLoading, statusBarStyle } = useApp();
  useLogoFont();

  return (
    <>
      {globalLoading ? <GlobalLoading /> : <Navigation />}
      <StatusBar style={statusBarStyle} />
    </>
  );
};

export default () => (
  <Providers>
    <App />
  </Providers>
);
