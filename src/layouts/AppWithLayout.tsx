import { Routes, Route } from "react-router-dom";

import PublicLayout from "src/layouts/PublicLayout";
import AdminLayout from "src/layouts/AdminLayout";
import AdminPage from "src/components/AdminPage";
import LandingPage from "src/components/LandingPage";
import SearchPage from "src/components/SearchPage";
import GarmentPage from "src/components/Garment/GarmentPage";
import AdminGarmentPage from "src/components/AdminPage/AdminGarmentPage";

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
    path: "/garments/garment/:garmentId",
    component: GarmentPage,
    layout: AdminLayout,
  },
  // {
  //   exact: true,
  //   path: '/login',
  //   component: LoginPage,
  //   layout: PublicLayout
  // },
  // Authenticated pages
  // {
  //   exact: false,
  //   path: '/dashboard',
  //   component: DashboardPage,
  //   layout: AuthLayout
  // }
  {
    path: "/admin",
    component: AdminPage,
    layout: AdminLayout,
  },
  {
    path: "/admin/garment/:garmentId",
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
            <page.layout>
              <page.component />
            </page.layout>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
