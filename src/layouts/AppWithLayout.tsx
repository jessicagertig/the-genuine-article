import { Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import LandingPage from '../components/LandingPage';
import SearchPage from '../components/SearchPage';
// type Pages = []

const pages = [
  // Public pages
  {
    path: '/',
    component: LandingPage,
    layout: PublicLayout
  },
  {
    path: '/search',
    component: SearchPage,
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