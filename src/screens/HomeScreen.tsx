import { FC } from "react";
import { NotOrderDay } from "../components/NotOrderDay";
import { OrderWindowStatus } from "../components/OrderWindowStatus";
import { YourOrder } from "../components/YourOrder";
import { useOrders } from "../providers/OrdersProvider";
import { ScreenNavigationProps, Screens } from "./Navigation";

export const HomeScreen: FC<ScreenNavigationProps> = ({ navigation }) => {
  const { myOrder, isOrderDay, orderWindowStatus } = useOrders();
  const orderNow = () => navigation.navigate(Screens.Orders);
  if (!isOrderDay) {
    return <NotOrderDay />;
  }
  if (myOrder) {
    return (
      <YourOrder
        orderWindowStatus={orderWindowStatus}
        order={myOrder}
        onChangeOrder={orderNow}
      />
    );
  }
  return (
    <OrderWindowStatus
      onOrderNow={orderNow}
      orderWindowStatus={orderWindowStatus}
    />
  );
};
