import { Flex, Text } from "@react-native-material/core";
import { FC, useEffect, useState } from "react";
import { FoodChoice, IFoodChoice } from "../components/FoodChoice";
import { useOrders } from "../providers/OrdersProvider";
import { OrderWindowStatusEnum } from "../utils/schedule";
import { ScreenNavigationProps, Screens } from "./Navigation";

export const OrderScreen: FC<ScreenNavigationProps> = ({ navigation }) => {
  const { getFoodChoices, makeOrder, myOrder, isOrderDay, orderWindowStatus } =
    useOrders();
  const [foodChoices, setFoodChoices] = useState<IFoodChoice[]>([]);

  useEffect(() => {
    getFoodChoices().then(setFoodChoices);
  }, [getFoodChoices]);

  return (
    <Flex style={{ padding: 16 }}>
      <Text variant="h6">Take your pick!</Text>
      <Flex>
        {foodChoices?.map((fc, index) => (
          <FoodChoice
            key={`${fc.name}-${index}`}
            foodChoice={fc}
            selected={fc.name === myOrder?.foodChoiceName}
            onPress={() => makeOrder(fc)}
            disabled={
              !isOrderDay || orderWindowStatus !== OrderWindowStatusEnum.Open
            }
          />
        ))}
      </Flex>
    </Flex>
  );
};
