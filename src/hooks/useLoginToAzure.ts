import {
  useAuthRequest,
  useAutoDiscovery,
  TokenResponse,
  exchangeCodeAsync,
  fetchUserInfoAsync,
} from "expo-auth-session";
import { azureConfig, authDisconveryUrl } from "../config/AzureAD";

export interface LoginToAzureResult {
  tokenResponse: TokenResponse;
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
}
/**
 * Opens a web browser to redirect the user to the Microsoft login website.
 * After user logs in successfully used the redirect callback parameters to fetch an access token
 * and finally calls the user profile endpoint to return both token response and user info response.
 */
export const useLoginToAzure = () => {
  const discovery = useAutoDiscovery(authDisconveryUrl);
  const [, , promptAsync] = useAuthRequest(azureConfig, discovery);

  const loginToAzure = async (): Promise<LoginToAzureResult> => {
    const result = await promptAsync({ useProxy: false });
    switch (result.type) {
      case "success":
        const options = {
          code: result.params?.code,
          clientId: azureConfig.clientId,
          redirectUri: azureConfig.redirectUri,
          scopes: azureConfig.scopes,
        };
        const tokenResponse = await exchangeCodeAsync(options, discovery);
        const userInfo = (await fetchUserInfoAsync(
          tokenResponse,
          discovery
        )) as LoginToAzureResult;
        const loginResult = {
          ...userInfo,
          tokenResponse,
        };
        console.log(loginResult);
        return loginResult;
      case "error":
        throw result.error;
      default:
        throw Error(`Login error: ${result.type}`);
    }
  };
  return loginToAzure;
};
