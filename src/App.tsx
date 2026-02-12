import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reader from './pages/Reader';
import MusicPlayer from './pages/MusicPlayer';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import './assets/styles/main.scss';

// Component để bọc Layout vào các route bảo vệ
const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/welcome" element={<Welcome />} />
          
          {/* Protected Routes inside Layout */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/reader/:id" element={<Reader />} />
            <Route path="/music/:id" element={<MusicPlayer />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={
            <div className="vh-100 d-flex align-items-center justify-content-center bg-black text-white">
              <div className="text-center">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="fs-4 text-secondary">Trang bạn tìm kiếm không tồn tại.</p>
                <a href="/" className="btn btn-primary rounded-pill px-4 mt-3">Quay lại trang chủ</a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
