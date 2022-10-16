import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { Constants } from "./Constants";
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDERID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
} = Constants;
// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDERID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  databaseURL: FIREBASE_DATABASE_URL,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);

export const buildAuthProvider = () => {
  const provider = new OAuthProvider("microsoft.com");
  provider.addScope("email");
  provider.addScope("openid");
  provider.addScope("profile");
  provider.setCustomParameters({
    prompt: "login",
    tenant: "common",
  });
  return provider;
};
