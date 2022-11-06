import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode
}
export const AuthContext = createContext({} as AuthContextProps);


export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    console.log('Logged')
  }

  const values = {
    signIn,
    user: {
      name: "Franklys Guimaraes",
      avatarUrl: "https://github.com/franklysg.png",
    },
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
