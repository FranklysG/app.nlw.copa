import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as Goole from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Goole.useAuthRequest({
    clientId:
      "719320719329-01rtgotiv32kb54nuf6fm1od447fjqoc.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  const signIn = useCallback(async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }, [promptAsync, setIsUserLoading]);

  const signInWithGoogle = useCallback(
    async (access_token: string) => {
      try {
        setIsUserLoading(true);
        const { token } = await api
          .post("/users", { access_token })
          .then((response) => response.data)
          .then((data) => data);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { user } = await api
          .get("/me")
          .then((response) => response.data)
          .then((data) => data);
        setUser(user);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsUserLoading(false);
      }
    },
    [setIsUserLoading]
  );

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  const values = {
    signIn,
    isUserLoading,
    user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
