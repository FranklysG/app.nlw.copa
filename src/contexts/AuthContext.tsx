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

  const signInWithGoogle = useCallback((access_token: string) => {
    console.log("Token => " + access_token);
  }, []);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  const values = {
    signIn,
    isUserLoading,
    user: {
      name: "Franklys Guimaraes",
      avatarUrl: "https://github.com/franklysg.png",
    },
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
