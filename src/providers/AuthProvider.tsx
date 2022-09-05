import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { useFirebase } from "./FirebaseProvider";
import { firebaseAuth } from "../config/Firebase";
import { useApp } from "./AppProvider";
import { LoginToAzureResult, useLoginToAzure } from "../hooks/useLoginToAzure";

export interface User {
  id: string;
  displayName: string;
  email: string;
}

export interface AuthState {
  login: () => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
  currentUser?: User;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
} as AuthState);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  // Utils
  const _loginToAzure = useLoginToAzure();
  // Context
  const firebase = useFirebase();
  const { setGlobalLoading } = useApp();
  // States
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Methods
  const restoreSession = () => {
    console.debug("Restoring session...");
    if (firebaseAuth.currentUser) {
      setIsAuthenticated(true);
      setCurrentUser({
        id: firebaseAuth.currentUser.uid,
        displayName: firebaseAuth.currentUser.displayName as string,
        email: firebaseAuth.currentUser.email as string,
      });
      console.log("Session found, welcome", firebaseAuth.currentUser.email);
    } else {
      console.log("No session found, please log in");
    }
    setGlobalLoading!(false);
  };

  const loginToAzure = async (): Promise<LoginToAzureResult> => {
    try {
      const azureResult = await _loginToAzure();
      console.log("✅ Login to azure success", azureResult.email);
      return azureResult;
    } catch (error) {
      console.log("Login to azure failed:", error);
      throw error;
    }
  };

  const loginToFirebase = async (azureResult: LoginToAzureResult) => {
    try {
      console.log("Login to firebase...");
      const userCredentials = await firebase.login!(azureResult);
      console.log("✅ Firebase login success", userCredentials.user);
      return userCredentials;
    } catch (error) {
      console.log("Firebase login error", error);
      throw error;
    }
  };

  const login = async () => {
    try {
      setGlobalLoading!(true);
      const azureResult = await loginToAzure();
      const {
        user: { displayName, email, uid },
      } = await loginToFirebase(azureResult);
      setCurrentUser({
        id: uid,
        displayName: displayName as string,
        email: email as string,
      });
      setIsAuthenticated(true);
    } finally {
      setGlobalLoading!(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(undefined);
    firebase.auth.signOut();
    console.log("Logged out, bye! 👋");
  };
  // Effects
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(() => restoreSession());
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, currentUser, isAuthenticated, logout, restoreSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
