import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";

export const WelcomeText: FC<unknown> = () => {
  return (
    <View style={styles.welcomeTextContainer}>
      <Text style={styles.welcomeText} color="primary">
        🥗​ Welcome​ 🥗​
      </Text>
      <Text variant="h4" style={styles.welcomeText} color="primary">
        🍒​ Food Run! 🍣​​
      </Text>
      <Text style={styles.welcomeText} color="primary">
        Your food orgnized
      </Text>
      <Text style={{ textAlign: "center" }}>
        Please log in to continue...​​
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeTextContainer: {
    marginTop: "40%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  welcomeText: {
    fontFamily: "Logo-Font",
    textAlign: "center",
    marginBottom: 8,
  },
});
