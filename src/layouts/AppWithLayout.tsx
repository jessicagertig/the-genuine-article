import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "src/layouts/PublicLayout";
import AdminLayout from "src/layouts/AdminLayout";
import AdminPage from "src/components/AdminPage";
import LandingPage from "src/components/LandingPage";
import SearchPage from "src/components/SearchPage";
import GarmentPage from "src/components/Garment/GarmentPage";
import AdminGarmentPage from "src/components/AdminPage/AdminGarmentPage";
import LoginPage from "src/components/Auth/LoginPage";

import { useAuthContext } from 'src/context/AuthContext';

// AuthWrapper

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuthContext();
  console.log("authed?", isAuthenticated)
  console.log("currentUser?", currentUser)

  if (!isAuthenticated) {
    // redirect to login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


// Pages

type Page = {
  path: string;
  component: React.FC;
  layout: React.FC<{ children: React.ReactNode }>;
};

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
    path: '/login',
    component: LoginPage,
    layout: PublicLayout
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
  return (
    <Routes>
      {pages.map((page, index) => (
        <Route
          key={index}
          path={page.path}
          element={
            page.layout === AdminLayout ? (
              <RequireAuth>
                <page.layout>
                  <page.component />
                </page.layout>
              </RequireAuth>
            ) : (
              <page.layout>
                <page.component />
              </page.layout>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default App;
