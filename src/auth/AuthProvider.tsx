import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  saveToken,
  removeToken,
} from "./tokenStorage";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(
  null
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const storedToken = await getToken();

        setToken(storedToken);
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function signIn(newToken: string) {
    await saveToken(newToken);
    setToken(newToken);
  }

  async function signOut() {
    await removeToken();
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}