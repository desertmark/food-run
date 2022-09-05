import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const WelcomeText: FC<unknown> = () => {
  return (
    <View style={styles.welcomeTextContainer}>
      <Text style={styles.welcomeText}>🥗​ Welcome​ 🥗​</Text>
      <Text style={styles.welcomeText}>🍒​ to inno&apos;s lunch! 🍣​​</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
