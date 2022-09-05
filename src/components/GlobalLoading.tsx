import { ActivityIndicator, Flex } from "@react-native-material/core";
import { FC } from "react";
import { Text } from "react-native";

export const GlobalLoading: FC<unknown> = () => {
  return (
    <Flex fill center>
      <ActivityIndicator size={100} color="primary" />
      <Text>Loading...</Text>
    </Flex>
  );
};
