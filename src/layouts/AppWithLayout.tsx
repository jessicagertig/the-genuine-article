import { BrowserRouter, Routes } from 'react-router-dom';


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
        {pages.map( (i, index) => {
          <Route key={index}
          exact={i.exact}
          path={i.path}
          render={props => (
            <i.layout history={props.history}>
              <i.component {...props} />
            </i.layout>
          )}/>
        })}
      </Routes>
    </BrowserRouter>
  )
}