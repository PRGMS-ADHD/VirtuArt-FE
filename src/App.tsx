import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Reset from './pages/Reset';
import Join from './pages/Join';
import Layout from './components/common/Layout';
import Main from './pages/Main';
import Gallery from './pages/Gallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/gallery',
    element: (
      <Layout>
        <Gallery />
      </Layout>
    ),
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
