import React from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUser } from "src/queryHooks/useAuth";

interface CurrentUser {
  username: string;
  email: string;
}

interface LoginData {
  user: CurrentUser;
  token: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  currentUser: any;
  login: (loginParams: LoginParams) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(
    null
  );
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading, error } = useLoginUser();

  const isAuthenticated = !!currentUser;

  const login = async (loginParams: LoginParams) => {
    // todo: add validation with Yup
    try {
      loginUser(
        {
          email: loginParams.email,
          password: loginParams.password,
        },
        {
          onSuccess: (data: LoginData) => {
            console.log("Success logging in user. Data:", data?.user);
            const token = data.token;
            if (data.token) {
              localStorage.setItem("token", token);
            }
            setCurrentUser({
              username: data?.user?.username,
              email: data?.user?.email,
            });
            navigate("/admin");
          },
          onError: (error: any) => {
            const message = error && error.data ? error.data.message : "";
            console.log("Request Error:", message);
          },
        }
      );
    } catch (e) {
      console.error("ERROR:", e);
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Clear the current user
    setCurrentUser(null);
    // Redirect the user to a different page
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within a AuthProvider"
    );
  }

  const { isAuthenticated, currentUser, login, logout } = context;

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
  };
};

export { useAuthContext, AuthProvider };

export default AuthProvider;
