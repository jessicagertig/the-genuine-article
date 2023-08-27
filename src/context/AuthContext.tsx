import React from "react";

interface CurrentUser {
  username: string;
  email: string;
}

interface AuthContextProps {
  currentUser?: CurrentUser | null;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
  currentUser?: CurrentUser | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  currentUser,
}) => {
  React.useEffect(() => {
    console.log("AUTH CONTEXT");
    console.log("current user", currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  const { currentUser } = context;

  return {
    currentUser,
  };
};

export { useAuthContext, AuthProvider };

export default AuthProvider;
