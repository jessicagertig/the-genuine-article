import { Routes, Route } from "react-router-dom";

import PublicLayout from "src/layouts/PublicLayout";
import AdminLayout from "src/layouts/AdminLayout";
import AdminPage from "src/components/AdminPage";
import LandingPage from "src/components/LandingPage";
import SearchPage from "src/components/SearchPage";
import GarmentPage from "src/components/AdminPage/GarmentPage";

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
    path: "/search",
    component: SearchPage,
    layout: PublicLayout,
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
    path: "/admin/garment",
    component: GarmentPage,
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
