import {
  Divider,
  Flex,
  Stack,
  Surface,
  Text,
  Button,
  Chip,
  Avatar,
} from "@react-native-material/core";
import { FC, useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { useFirebase } from "../providers/FirebaseProvider";
import { OrderWindowStatusEnum } from "../utils/schedule";

export interface IOrder {
  orderId?: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  foodChoiceKey: string;
  foodChoiceName: string;
  date: number;
}

export interface YourOrderProps {
  order: IOrder;
  onChangeOrder?: null | ((event: GestureResponderEvent) => void) | undefined;
  orderWindowStatus: OrderWindowStatusEnum;
}

export const YourOrder: FC<YourOrderProps> = ({
  order,
  onChangeOrder,
  orderWindowStatus,
}) => {
  const { foodChoices } = useFirebase();
  // TODO: Move to other place
  const [image, setImage] = useState<string>();
  useEffect(() => {
    foodChoices
      .getByKeyAndPath<string>(order.foodChoiceKey, "image")
      .then((image) => setImage(image));
  }, [foodChoices, order.foodChoiceKey]);
  return (
    <Flex fill center>
      <Surface
        elevation={2}
        category="medium"
        style={{ margin: 8, padding: 32 }}
      >
        <Flex center>
          <Chip label="Your order today" color="primary" />
        </Flex>
        <Divider style={{ marginVertical: 16 }} />
        <Stack items="center" spacing={16}>
          <Avatar image={{ uri: image }} size={256} />
          <Text variant="h6">{order?.foodChoiceName}</Text>
        </Stack>
        {orderWindowStatus === OrderWindowStatusEnum.Open && (
          <Button
            disabled={orderWindowStatus !== OrderWindowStatusEnum.Open}
            style={{ marginTop: 24 }}
            title="Change order"
            onPress={onChangeOrder}
          />
        )}
        {orderWindowStatus === OrderWindowStatusEnum.Closed && (
          <Chip
            style={{ marginTop: 24 }}
            label="Orders are closed for the day"
            color="warning"
          />
        )}
      </Surface>
    </Flex>
  );
};
