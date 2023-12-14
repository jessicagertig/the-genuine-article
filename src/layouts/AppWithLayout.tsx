import React, { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoadingState from "src/components/shared/LoadingState";

import { AuthProvider } from "src/context/AuthContext";
import { useAuthedUser } from "src/queryHooks/useAuth";
// Import your layouts
const PublicLayout = lazy(() => import("src/layouts/PublicLayout"));
const AdminLayout = lazy(() => import("src/layouts/AdminLayout"));

// Import your components
const LandingPage = lazy(() => import("src/components/LandingPage"));
const SearchPage = lazy(() => import("src/components/SearchPage"));
const GarmentPage = lazy(() => import("src/components/Garment/GarmentPage"));
const AdminPage = lazy(() => import("src/components/AdminPage"));
const AdminGarmentPage = lazy(
  () => import("src/components/AdminPage/AdminGarmentPage")
);
const LoginPage = lazy(() => import("src/components/Auth/LoginPage"));
const Logout = lazy(() => import("src/components/Auth/Logout"));


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
  const [initialUser, setInitialUser] = React.useState(null);

  React.useEffect(() => {
    // console.log("fetching?", isFetching);
    // console.log("loading?", isLoading);
    // console.log("is enabled?", isEnabled);
    // console.log("user", user);
    if (user !== undefined) {
      setInitialUser(user);
    }
  }, [user, isLoading, isFetching, isEnabled]);
  // TODO:  possiblyl pass user down to component to be set in context if user is defined but currentUser is not
  return (
    <AuthProvider currentUser={initialUser}>
      {isLoading ? (
        <LoadingState />
      ) : (
        <React.Suspense fallback={<LoadingState />}>
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
        </React.Suspense>
      )}
    </AuthProvider>
  );
};

export default App;
