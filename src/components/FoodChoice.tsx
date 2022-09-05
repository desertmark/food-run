import {
  Avatar,
  Box,
  Flex,
  Icon,
  Pressable,
  Surface,
  Text,
  useTheme,
  Wrap,
} from "@react-native-material/core";
import { FC } from "react";
import { GestureResponderEvent } from "react-native";

export interface IFoodChoice {
  key: string;
  name: string;
  image: string;
}

export interface FoodChoiceProps {
  foodChoice: IFoodChoice;
  selected?: boolean;
  disabled?: boolean;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export const FoodChoice: FC<FoodChoiceProps> = ({
  foodChoice,
  onPress,
  selected,
  disabled,
}) => {
  const {
    palette: { primary },
  } = useTheme();
  return (
    <Surface
      elevation={2}
      category="medium"
      style={{
        marginVertical: 8,
        backgroundColor: disabled ? "#ddd" : selected ? primary.main : "white",
      }}
    >
      <Pressable
        disabled={selected || disabled}
        onPress={onPress}
        style={{ padding: 8 }}
      >
        <Flex direction="row" items="center">
          <Avatar
            image={{ uri: foodChoice.image }}
            style={{ marginRight: 8 }}
          />
          <Text
            variant="h6"
            color={disabled ? "#aaa" : selected ? "on-primary" : "primary"}
          >
            {foodChoice.name}
          </Text>
        </Flex>
      </Pressable>
    </Surface>
  );
};
