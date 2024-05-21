// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MyPage from '@/pages/MyPage';
// import Artist from '@/pages/Artist';
// import Layout from './components/common/Layout';
// import Gallery from './pages/Gallery';
// import Login from './pages/Login';
// import Reset from './pages/Reset';
// import Join from './pages/Join';
// import Artists from './pages/Artists';
// import ArtPiece from './pages/ArtPiece';
//
// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Gallery />} />
//           <Route path="/artists" element={<Artists />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/reset" element={<Reset />} />
//           <Route path="/signup" element={<Join />} />
//           <Route path="/artpiece/:id" element={<ArtPiece />} />
//           <Route path="/mypage" element={<MyPage />} />
//           <Route path="/artist/:id" element={<Artist />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }
//
// export default App;
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

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <Error />,
    children: [
      { path: '', element: <LandingPage /> }, // 기본 경로에 LandingPage 설정
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
