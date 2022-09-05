import { Flex, Text } from "@react-native-material/core";
import { FC } from "react";

export const NotOrderDay: FC = () => {
  return (
    <Flex fill center>
      <Text variant="h2">🍜</Text>
      <Text variant="h6">Today is not an order day.</Text>
    </Flex>
  );
};
