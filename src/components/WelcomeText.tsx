import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { LogoPopAnimation } from "./Logo";
import { FadeInAnimation } from "./Animate";

export const WelcomeText: FC<unknown> = () => {
  return (
    <View style={styles.welcomeTextContainer}>
      <LogoPopAnimation secondary size={300} />
      <Text style={styles.welcomeText} color="primary" variant="h5">
        Your food orgnized
      </Text>
      <Text style={{ textAlign: "center" }} color="primary">
        Please log in to continue...​​
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeTextContainer: {
    marginTop: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 16,
  },
  welcomeText: {
    fontFamily: "Logo-Font",
    textAlign: "center",
    marginBottom: 8,
  },
});
