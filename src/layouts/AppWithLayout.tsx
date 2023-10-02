import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PublicLayout from "src/layouts/PublicLayout";
import AdminLayout from "src/layouts/AdminLayout";
import AdminPage from "src/components/AdminPage";
import LandingPage from "src/components/LandingPage";
import SearchPage from "src/components/SearchPage";
import GarmentPage from "src/components/Garment/GarmentPage";
import AdminGarmentPage from "src/components/AdminPage/AdminGarmentPage";
import LoginPage from "src/components/Auth/LoginPage";
import Logout from "src/components/Auth/Logout";

import LoadingState from "src/components/shared/LoadingState";

import { AuthProvider } from "src/context/AuthContext";
import { useAuthedUser } from "src/queryHooks/useAuth";

// after login auth works as follows
// if a route is an authed route
// useAuthedUser is enabled
// in useAuthedUser if there is an error - the user is redirected to logout
// logout will clear out any cached info or tokens and setCurrentUser
// logout will then redirect to home "/"
interface Page {
  path: string;
  component: React.FC;
  layout: React.FC<{ children: React.ReactNode }>;
}

const pages: Page[] = [
  // Public pages
  {
    path: "/",
    component: LandingPage,
    layout: PublicLayout,
  },
  {
    path: "/garments",
    component: SearchPage,
    layout: PublicLayout,
  },
  {
    path: "/garments/:garmentId",
    component: GarmentPage,
    layout: PublicLayout,
  },
  {
    path: "/login",
    component: LoginPage,
    layout: PublicLayout,
  },
  {
    path: "/logout",
    component: Logout,
    layout: PublicLayout,
  },
  // authed pages
  {
    path: "/admin",
    component: AdminPage,
    layout: AdminLayout,
  },
  {
    path: "/admin/garments/:garmentId",
    component: AdminGarmentPage,
    layout: AdminLayout,
  },
];

const App: React.FC = () => {
  const location = useLocation();
  const isAuthedRoute = location.pathname.includes("admin");
  const isLoggingIn = location.pathname.includes("login");
  const isEnabled = isAuthedRoute || isLoggingIn;
  const {
    data: user,
    isLoading,
    isFetching,
  } = useAuthedUser({ enabled: isEnabled });
  const [ initialUser, setInitialUser ] = React.useState(null)

  React.useEffect(() => {
    // console.log("fetching?", isFetching);
    // console.log("loading?", isLoading);
    // console.log("is enabled?", isEnabled);
    // console.log("user", user);
    if (user !== undefined) {
      setInitialUser(user)
    }
  }, [user, isLoading, isFetching, isEnabled]);
  // TODO:  possiblyl pass user down to component to be set in context if user is defined but currentUser is not
  return (
    <AuthProvider currentUser={initialUser}>
      {isLoading ? (
        <LoadingState />
      ) : (
        <Routes>
          {pages.map((page, index) => (
            <Route
              key={index}
              path={page.path}
              element={
                <page.layout>
                  <page.component />
                </page.layout>
              }
            />
          ))}
        </Routes>
      )}
    </AuthProvider>
  );
};

export default App;
