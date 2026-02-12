import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reader from './pages/Reader';
import MusicPlayer from './pages/MusicPlayer';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import './assets/styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reader/:id" element={<Reader />} />
                  <Route path="/music/:id" element={<MusicPlayer />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<div className="p-5 text-center"><h1>404 Not Found</h1></div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
