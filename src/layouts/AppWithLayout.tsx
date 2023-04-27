import { Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../components/LandingPage';
// type Pages = []

const pages = [
  // Public pages
  {
    path: '/',
    component: LandingPage,
    layout: PublicLayout
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
];

const App = () => {
  return (
    <Routes>
      {pages.map((page, index) => (
        <Route 
          key={index}
          path={page.path}
          element={(
            <page.layout>
              <page.component />
            </page.layout>
          )}/>
      ))}
    </Routes>
  )
}

export default App;