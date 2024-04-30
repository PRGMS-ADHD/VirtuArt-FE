import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout';
import Gallery from './pages/Gallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Gallery />
      </Layout>
    ),
    children: [{ path: '/', element: <Gallery /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
