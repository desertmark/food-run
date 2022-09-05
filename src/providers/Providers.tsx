import {
  defaultTheme,
  IconComponentProvider,
  ThemeProvider,
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FC, PropsWithChildren, useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import { FirebaseProvider } from "./FirebaseProvider";
import { BackendProvider } from "./BackendProvider";
import { AppProvider } from "./AppProvider";
import { OrdersProvider } from "./OrdersProvider";
import { theme } from "../config/Theme";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <IconComponentProvider IconComponent={MaterialCommunityIcons as any}>
      <AppProvider>
        <BackendProvider>
          <FirebaseProvider>
            <AuthProvider>
              <PrivateProviders>{children}</PrivateProviders>
            </AuthProvider>
          </FirebaseProvider>
        </BackendProvider>
      </AppProvider>
    </IconComponentProvider>
  </ThemeProvider>
);

export const PrivateProviders: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <OrdersProvider>{children}</OrdersProvider>
  ) : (
    <>{children}</>
  );
};
