import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout'; 
import MainPage from '../components/MainPage';
// type Pages = []

const pages = [
  // Public pages
  {
    path: '/',
    component: MainPage,
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
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App;