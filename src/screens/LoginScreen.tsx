import { FC, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScreenNavigationProps } from "./Navigation";
import { useAuth } from "../providers/AuthProvider";
import { Icon, Button } from "@react-native-material/core";
import { WelcomeText } from "../components/WelcomeText";
import { useMainColor } from "../config/Theme";

export const LoginScreen: FC<ScreenNavigationProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>("");
  const styles = useStyles();
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
          trailing={<Icon name="login" size={16} color={"secondary"} />}
        />
      </View>
      <Text>{loginError}</Text>
    </View>
  );
};

const useStyles = () => {
  const secondary = useMainColor("secondary");
  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
      backgroundColor: secondary,
    },
    loginForm: {
      paddingHorizontal: 32,
      flex: 1,
      alignItems: "center",
      gap: 16,
      justifyContent: "center",
    },
  });
};
