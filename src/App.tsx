import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Reset from './pages/Reset';
import Join from './pages/Join';
import Layout from './components/common/layout/Layout';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/reset',
        element: <Reset />,
      },
      {
        path: '/signup',
        element: <Join />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
