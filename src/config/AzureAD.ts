import {
  makeRedirectUri,
  Prompt,
  ResponseType,
  AuthRequestConfig,
} from "expo-auth-session";
import Constants from "expo-constants";
Constants.manifest.originalFullName = "@fgasulay/food-run";
const { AUTH_APP_ID, AUTH_APP_SECRET, AUTH_DISCOVERY_URL } =
  Constants.manifest.extra.env;

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
