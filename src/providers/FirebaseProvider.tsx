import { FirebaseApp } from "firebase/app";
import { Auth, signInWithCustomToken, UserCredential } from "firebase/auth";
import { Database } from "firebase/database";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { IFoodChoice } from "../components/FoodChoice";
import { IOrder } from "../components/YourOrder";
import {
  firebaseApp,
  firebaseAuth,
  firebaseDatabase,
} from "../config/Firebase";
import { LoginToAzureResult } from "../hooks/useLoginToAzure";
import {
  FirebaseCollection,
  FirebaseCollectionEnum,
} from "../utils/FirebaseCollection";
import { FirebaseObject, FirebaseObjectsEnum } from "../utils/FirebaseObject";
import { IOrderWindow, ISchedule } from "../utils/schedule";
import { useBackend } from "./BackendProvider";

export interface FirebaseState {
  app: FirebaseApp;
  auth: Auth;
  db: Database;
  login?: (azureLoginResult: LoginToAzureResult) => Promise<UserCredential>;
  orders: FirebaseCollection<IOrder>;
  foodChoices: FirebaseCollection<IFoodChoice>;
  schedule: FirebaseObject<ISchedule>;
  orderWindow: FirebaseObject<IOrderWindow>;
}

const firebaseState: FirebaseState = {
  app: firebaseApp,
  auth: firebaseAuth,
  db: firebaseDatabase,
  orders: new FirebaseCollection<IOrder>(
    firebaseDatabase,
    FirebaseCollectionEnum.Orders
  ),
  foodChoices: new FirebaseCollection<IFoodChoice>(
    firebaseDatabase,
    FirebaseCollectionEnum.FoodChoices
  ),
  schedule: new FirebaseObject(firebaseDatabase, FirebaseObjectsEnum.Schedule),
  orderWindow: new FirebaseObject(
    firebaseDatabase,
    FirebaseObjectsEnum.OrderWindow
  ),
};
const FirebaseContext = createContext<FirebaseState>(firebaseState);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { postToken } = useBackend();
  /**
   * Login gets a custom token from the backend with the given active directory
   * login result to use it to sign in firebase.
   */
  const login = async ({
    tokenResponse: { accessToken },
  }: LoginToAzureResult) => {
    const { token } = await postToken({ accessToken });
    return await signInWithCustomToken(firebaseAuth, token);
  };

  return (
    <FirebaseContext.Provider value={{ ...firebaseState, login }}>
      {children}
    </FirebaseContext.Provider>
  );
};
