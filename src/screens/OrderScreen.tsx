import { Button, Flex, Text } from "@react-native-material/core";
import { FC, useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { FoodChoice, IFoodChoice } from "../components/FoodChoice";
import { ConfirmHubTemplate, useHub } from "../components/Hub";
import { useOrders } from "../providers/OrdersProvider";
import { OrderWindowStatusEnum } from "../utils/schedule";
import { ScreenNavigationProps, Screens } from "./Navigation";

export const OrderScreen: FC<ScreenNavigationProps> = ({ navigation }) => {
  const { getFoodChoices, makeOrder, myOrder, isOrderDay, orderWindowStatus } =
    useOrders();
  const [foodChoices, setFoodChoices] = useState<IFoodChoice[]>([]);
  const { openHub, closeHub } = useHub();
  useEffect(() => {
    getFoodChoices().then(setFoodChoices);
  }, [getFoodChoices]);

  return (
    <ScrollView>
      <Flex style={{ padding: 16, overflow: "scroll" }}>
        <Text variant="h6">Take your pick!</Text>
        <Flex>
          {foodChoices?.map((fc, index) => (
            <FoodChoice
              key={`${fc.name}-${index}`}
              foodChoice={fc}
              selected={fc.name === myOrder?.foodChoiceName}
              onPress={() => {
                openHub(
                  <ConfirmHubTemplate
                    onConfirm={async () => {
                      await makeOrder(fc);
                      console.info("Order made, navigate home...");
                      navigation.navigate(Screens.Home);
                      closeHub();
                    }}
                    onCancel={closeHub}
                  />
                );
              }}
              disabled={
                !isOrderDay || orderWindowStatus !== OrderWindowStatusEnum.Open
              }
            />
          ))}
        </Flex>
      </Flex>
    </ScrollView>
  );
};
