import { startAt, orderByChild } from "firebase/database";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IFoodChoice } from "../components/FoodChoice";
import { IOrder } from "../components/YourOrder";
import { getWeekDay, OrderWindowStatusEnum } from "../utils/schedule";
import { today } from "../utils/today";
import { useAuth } from "./AuthProvider";
import { useFirebase } from "./FirebaseProvider";

export interface OrdersState {
  myOrder?: IOrder;
  getFoodChoices: () => Promise<IFoodChoice[]>;
  makeOrder: (foodChoice: IFoodChoice) => Promise<void>;
  isOrderDay: boolean;
  orderWindowStatus: OrderWindowStatusEnum;
}

const OrdersContext = createContext<OrdersState>({} as any);

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { db, orders, foodChoices, schedule, orderWindow } = useFirebase();
  const { currentUser: user } = useAuth();
  // State
  const [myOrder, setMyOrder] = useState<IOrder>();
  const [isOrderDay, setIsOrderDay] = useState<boolean>(false);
  const [orderWindowStatus, setOrderWindowStatus] =
    useState<OrderWindowStatusEnum>(OrderWindowStatusEnum.New);
  // Methods
  const getFoodChoices = useCallback(async (): Promise<IFoodChoice[]> => {
    try {
      const items = await foodChoices.get();
      console.log("Got food choices");
      return items;
    } catch (error) {
      console.error("Failed to get food choices", error);
      throw error;
    }
  }, [foodChoices]);

  const makeOrder = async (foodChoice: IFoodChoice) => {
    const order: IOrder = {
      userId: user?.id!,
      userDisplayName: user?.displayName!,
      userEmail: user?.email!,
      foodChoiceName: foodChoice.name,
      foodChoiceKey: foodChoice.key,
      date: new Date().getTime(),
    };
    try {
      if (myOrder?.orderId) {
        // Update if order already exists for today.
        await orders.update(myOrder?.orderId, order);
        console.log("Order update successfuly", order);
      } else {
        // Push a new order if it doesn't exist fort today yet.
        await orders.push(order);
        console.log("Order sent successfuly", order);
      }
    } catch (error) {
      console.error("Failed to place order: ", { error, foodChoice, user });
    }
  };

  const subscribeToOrders = useCallback(() => {
    console.log("Subscribing to order changes");
    const updateMyOrder = (order: IOrder, key: string) => {
      if (order.userId === user?.id) {
        order.orderId = key;
        setMyOrder(order);
        console.log("MyOrder updated", order);
      }
    };
    return orders.onItemAddedOrUpdated(
      updateMyOrder,
      orderByChild("date"),
      startAt(today())
    );
  }, [orders, user?.id]);

  const subscribeSchedule = useCallback(() => {
    try {
      console.info("Subscribing to schedule...");
      const today = getWeekDay();
      return schedule.onValue((schedule) => {
        console.debug("Today is", today);
        const isOrderDay = schedule[today];
        console.debug("Schedule update", schedule);
        isOrderDay
          ? console.info("Today is an order day! 🥳 🥳")
          : console.info("Today is not an order day 🙁 🙁");
        setIsOrderDay(isOrderDay);
      });
    } catch (error) {
      console.error("Failed to subscribe to schedule", error);
      throw error;
    }
  }, [schedule]);

  const subscribeToOrderWindow = useCallback(() => {
    try {
      console.info("Subscribing to order window");
      return orderWindow.onValue((orderWindow) => {
        console.info("Order windows status is:", orderWindow.status);
        setOrderWindowStatus(orderWindow.status);
      });
    } catch (error) {
      console.error("Failed to subscribe to the order window", error);
      throw error;
    }
  }, [orderWindow]);

  // Effects
  useEffect(() => {
    return subscribeToOrders();
  }, [subscribeToOrders]);

  useEffect(() => {
    return subscribeSchedule();
  }, [subscribeSchedule]);

  useEffect(() => {
    return subscribeToOrderWindow();
  }, [subscribeToOrderWindow]);

  return (
    <OrdersContext.Provider
      value={{
        getFoodChoices,
        makeOrder,
        myOrder,
        isOrderDay,
        orderWindowStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
