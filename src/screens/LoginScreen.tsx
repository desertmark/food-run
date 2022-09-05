import { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScreenNavigationProps, Screens } from "./Navigation";
import { useAuth } from "../providers/AuthProvider";
import { Icon, Button } from "@react-native-material/core";
import { WelcomeText } from "../components/WelcomeText";

export const LoginScreen: FC<ScreenNavigationProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>("");

  const onLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      setLoginError(error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={styles.loginForm}>
        <Button
          title="Log in"
          onPress={onLogin}
          trailing={<Icon name="login" size={16} color={"white"} />}
        />
      </View>
      <Text>{loginError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  loginForm: {
    paddingHorizontal: 32,
    flex: 1,
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
  },
});
