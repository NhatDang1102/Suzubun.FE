import React from 'react';
import { Home, Music, BookOpen, Layers, User, Settings, Play } from 'lucide-react';
import { Link, useLocation, NavLink } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="d-flex vh-100 overflow-hidden bg-black">
      {/* Sidebar */}
      <nav className="sidebar d-none d-md-flex">
        <div className="px-3 mb-4">
          <h3 className="text-white fw-bold d-flex align-items-center gap-2">
            <div className="bg-primary p-1 rounded-circle"><Music size={24} fill="white" /></div>
            Suzubun
          </h3>
        </div>
        
        <div className="d-flex flex-column gap-1">
          <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Home size={24} /> <span>Trang chủ</span>
          </NavLink>
          <NavLink to="/articles" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <BookOpen size={24} /> <span>Bài báo</span>
          </NavLink>
          <NavLink to="/music" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Music size={24} /> <span>Âm nhạc</span>
          </NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Layers size={24} /> <span>Thư viện từ</span>
          </NavLink>
        </div>

        <div className="mt-auto pt-4 border-top border-secondary border-opacity-10">
          <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Settings size={24} /> <span>Cài đặt</span>
          </NavLink>
        </div>
      </nav>

      {/* Main View */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden main-view">
        <header className="px-4 py-3 d-flex justify-content-between align-items-center sticky-top backdrop-blur">
          <div className="d-flex gap-2">
            <button className="btn btn-black-outline rounded-circle p-2" onClick={() => window.history.back()}>
              <User size={20} />
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <button className="btn btn-white rounded-pill px-4 fw-bold btn-sm text-black bg-white">Upgrade</button>
            <Link to="/settings" className="bg-dark p-1 rounded-circle overflow-hidden shadow" style={{ width: 32, height: 32 }}>
              <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Nhat" alt="avatar" className="w-100 h-100" />
            </Link>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto px-4 py-3 custom-scrollbar pb-5">
          {children}
          <div style={{ height: '100px' }}></div> {/* Spacer for player */}
        </main>
      </div>

      {/* Player Bar */}
      <div className="fixed-bottom player-bar d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3" style={{ minWidth: 180 }}>
          <div className="bg-dark rounded shadow" style={{ width: 56, height: 56 }}></div>
          <div>
            <div className="fw-bold small">Chưa phát nhạc</div>
            <div className="text-grey x-small">Suzubun Reader</div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center gap-2 flex-grow-1 max-w-lg">
          <div className="d-flex align-items-center gap-4 text-grey">
            <Play size={32} fill="white" className="text-white hover-scale cursor-pointer" />
          </div>
          <div className="w-100 d-flex align-items-center gap-2">
            <span className="x-small text-grey">0:00</span>
            <div className="progress flex-grow-1" style={{ height: 4 }}>
              <div className="progress-bar bg-white" style={{ width: '0%' }}></div>
            </div>
            <span className="x-small text-grey">0:00</span>
          </div>
        </div>

        <div className="d-flex justify-content-end" style={{ minWidth: 180 }}>
          {/* Volume controls etc */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
