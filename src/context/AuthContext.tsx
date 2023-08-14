import React from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  currentUser: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setcurrentUser] = React.useState(null);

  const isAuthenticated = !!currentUser;

  const login = () => {
    // perform login and set currentUser
  };

  const logout = () => {
    // perform logout and unset currentUser
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
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useWindowSizeContext must be used within a WindowSizeProvider"
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

export { useAuth, AuthProvider };

export default AuthProvider;
