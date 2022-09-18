import {
  backend,
  PostTokenResponse,
  PostTokenRequest,
} from "../config/Backend";
import { createContext, FC, PropsWithChildren, useContext } from "react";

export interface BackendState {
  postToken: (request: PostTokenRequest) => Promise<PostTokenResponse>;
}

const BackendContext = createContext<BackendState>({} as BackendState);

export const useBackend = () => {
  return useContext(BackendContext);
};

export const BackendProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const postToken = async (request: PostTokenRequest) => {
    try {
      const res = await backend.post<PostTokenResponse>(
        "/token",
        {},
        {
          headers: {
            authorization: `Bearer ${request.accessToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Failed backend.postToken", JSON.stringify({ error }));
      throw error;
    }
  };

  return (
    <BackendContext.Provider value={{ postToken }}>
      {children}
    </BackendContext.Provider>
  );
};
