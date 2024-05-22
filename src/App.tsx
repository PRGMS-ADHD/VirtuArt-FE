import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './components/common/Layout';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Reset from './pages/Reset';
import Join from './pages/Join';
import Artists from './pages/Artists';
import ArtPiece from './pages/ArtPiece';
import MyPage from './pages/MyPage';
import Artist from './pages/Artist';
import Error from './components/common/Error';
import ArtPieceDetail from '@/components/galleryDetail/ArtPieceDetail';
import LandingPage from './pages/Landing';
import LandingLayout from '@/components/common/LandingLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <Error />,
    children: [
      { path: '/', element: <LandingPage /> }, // 기본 경로에 LandingPage 설정
      { path: 'gallery', element: <Gallery /> },
      { path: 'artists', element: <Artists /> },
      { path: 'login', element: <Login /> },
      { path: 'reset', element: <Reset /> },
      { path: 'join', element: <Join /> },
      { path: 'artpiece/:id', element: <ArtPiece /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'artists/:id', element: <Artist /> },
      { path: 'artworks/:id', element: <ArtPieceDetail /> },
      { path: '*', element: <Error /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
