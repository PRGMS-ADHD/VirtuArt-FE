import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Reset from './pages/Reset';
import Join from './pages/Join';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/signup" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
