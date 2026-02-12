import React from 'react';
import { Home, Music, BookOpen, Layers, User, LogOut, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active }: any) => (
  <Link to={path} className={`d-flex align-items-center p-3 text-decoration-none transition-all ${active ? 'text-white bg-primary rounded-3 shadow-sm' : 'text-secondary hover-white'}`}>
    <Icon size={20} className="me-3" />
    <span className="fw-medium">{label}</span>
  </Link>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="container-fluid vh-100 p-0 bg-dark text-light overflow-hidden">
      <div className="row g-0 h-100">
        {/* Sidebar */}
        <div className="col-auto bg-black border-end border-secondary border-opacity-25 px-3 py-4 d-none d-md-block" style={{ width: '260px' }}>
          <div className="mb-5 px-3 d-flex align-items-center">
            <div className="bg-primary p-2 rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <span className="fw-bold text-white fs-4">S</span>
            </div>
            <h4 className="m-0 fw-bold tracking-tight">Suzubun</h4>
          </div>

          <div className="nav flex-column gap-2">
            <SidebarItem icon={Home} label="Trang chủ" path="/" active={location.pathname === '/'} />
            <SidebarItem icon={BookOpen} label="Bài báo & Truyện" path="/articles" active={location.pathname === '/articles'} />
            <SidebarItem icon={Music} label="Âm nhạc" path="/music" active={location.pathname === '/music'} />
            <SidebarItem icon={Layers} label="Flashcards" path="/flashcards" active={location.pathname === '/flashcards'} />
          </div>

          <div className="mt-auto pt-5 border-top border-secondary border-opacity-10">
            <SidebarItem icon={Settings} label="Cài đặt" path="/settings" active={location.pathname === '/settings'} />
            <SidebarItem icon={User} label="Hồ sơ" path="/profile" active={location.pathname === '/profile'} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col h-100 overflow-auto position-relative bg-gradient-dark">
          {/* Top Navbar */}
          <header className="sticky-top bg-dark bg-opacity-75 backdrop-blur px-4 py-3 d-flex justify-content-between align-items-center z-3 border-bottom border-secondary border-opacity-10">
            <div className="d-flex gap-2">
              <button className="btn btn-black-outline rounded-circle p-2" onClick={() => window.history.back()}>
                <User size={18} />
              </button>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-light rounded-pill px-4 btn-sm fw-bold">Nâng cấp</button>
              <div className="dropdown">
                <button className="btn btn-dark rounded-circle p-1 overflow-hidden shadow-sm" style={{ width: '35px', height: '35px' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nhat" alt="avatar" className="w-100 h-100" />
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 h-100 pb-5 mb-5">
            {children}
          </main>
        </div>
      </div>

      {/* Mini Music Player (Fixed at Bottom) */}
      <div className="fixed-bottom bg-black border-top border-secondary border-opacity-25 px-4 py-2 d-flex align-items-center z-3 shadow-lg" style={{ height: '90px' }}>
        <div className="d-flex align-items-center gap-3" style={{ width: '30%' }}>
          <img src="https://via.placeholder.com/56" alt="song art" className="rounded-2 shadow-sm" />
          <div>
            <h6 className="m-0 fw-bold">Tên bài hát đang phát</h6>
            <small className="text-secondary">Ca sĩ</small>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center gap-1" style={{ width: '40%' }}>
          <div className="d-flex align-items-center gap-4 text-secondary">
            <Layers size={18} className="hover-white cursor-pointer" />
            <Music size={24} className="text-white hover-scale" />
            <Layers size={18} className="hover-white cursor-pointer" />
          </div>
          <div className="w-100 d-flex align-items-center gap-2 px-5">
            <small className="text-secondary">0:45</small>
            <div className="progress flex-grow-1" style={{ height: '4px' }}>
              <div className="progress-bar bg-light" style={{ width: '30%' }}></div>
            </div>
            <small className="text-secondary">3:20</small>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3" style={{ width: '30%' }}>
          <Layers size={18} className="text-secondary" />
          <div className="progress" style={{ height: '4px', width: '100px' }}>
            <div className="progress-bar bg-light" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
