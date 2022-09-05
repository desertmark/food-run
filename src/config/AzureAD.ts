import {
  makeRedirectUri,
  Prompt,
  ResponseType,
  AuthRequestConfig,
} from "expo-auth-session";
import ExpoConstants from "expo-constants";
import { Constants } from "./Constants";

ExpoConstants.manifest.originalFullName = "@fgasulay/food-run";
const { AUTH_DISCOVERY_URL, AUTH_APP_SECRET, AUTH_APP_ID } = Constants;

export const azureConfig: AuthRequestConfig = {
  clientId: AUTH_APP_ID,
  redirectUri: makeRedirectUri({
    path: "login",
  }),
  clientSecret: AUTH_APP_SECRET,
  scopes: ["profile", "email", "openid", "user.read"],
  responseType: ResponseType.Code,
  extraParams: {
    tenantId: "common",
    domainHint: "AZURE_DOMAIN_HINT",
  },
  usePKCE: false,
  prompt: Prompt.Login,
};
export const authDisconveryUrl = AUTH_DISCOVERY_URL;
