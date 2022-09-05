import axios from "axios";
import Constants from "expo-constants";

export const backend = axios.create({
  baseURL: Constants.manifest.env.BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PostTokenRequest {
  uid: string;
  claims: {
    id: string;
    displayName: string;
    email: string;
  };
}

export interface PostTokenResponse {
  token: string;
}
