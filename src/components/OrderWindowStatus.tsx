import { Button, Flex, Text } from "@react-native-material/core";
import { FC } from "react";
import { OrderWindowStatusEnum } from "../utils/schedule";

export interface OrderStatusProps {
  orderWindowStatus: OrderWindowStatusEnum;
  onOrderNow: () => void;
}

const ORDER_WINDOW_STATUS_MSG = {
  [OrderWindowStatusEnum.New]: {
    icon: "🕛",
    message: "We are not ready to take orders yet",
    caption: "We will let you know when we are ready",
  },
  [OrderWindowStatusEnum.Open]: {
    icon: "🍜",
    message: "Please tell us your order!",
    caption: "You haven't place your order yet.",
  },
  [OrderWindowStatusEnum.Closed]: {
    icon: "🛑",
    message: "Sorry orders are already closed!",
    caption: "",
  },
};

export const OrderWindowStatus: FC<OrderStatusProps> = ({
  onOrderNow,
  orderWindowStatus,
}) => {
  const statusInfo = ORDER_WINDOW_STATUS_MSG[orderWindowStatus];
  return (
    <Flex fill center>
      <Text variant="h2">{statusInfo?.icon}</Text>
      <Text variant="h6">{statusInfo?.message || ""}</Text>
      <Text variant="caption">{statusInfo?.caption || ""}</Text>

      <Button
        disabled={orderWindowStatus !== OrderWindowStatusEnum.Open}
        style={{ marginTop: 16 }}
        title="Order now"
        onPress={onOrderNow}
      />
    </Flex>
  );
};
