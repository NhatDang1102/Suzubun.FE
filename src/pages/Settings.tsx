import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Moon, Bell } from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="fw-bold mb-4">Cài đặt</h2>

      <div className="bg-light-dark rounded-4 p-4 mb-4">
        <h5 className="fw-bold mb-3">Tài khoản</h5>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: 60, height: 60 }}>
            {user?.user_metadata?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h6 className="m-0 fw-bold">{user?.user_metadata?.full_name || 'Người dùng'}</h6>
            <small className="text-secondary">{user?.email}</small>
          </div>
        </div>
        <button onClick={signOut} className="btn btn-outline-danger btn-sm rounded-pill px-4">
          <LogOut size={16} className="me-2" /> Đăng xuất
        </button>
      </div>

      <div className="bg-light-dark rounded-4 p-4">
        <h5 className="fw-bold mb-3">Tùy chỉnh</h5>
        <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-secondary border-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <Moon size={20} className="text-secondary" />
            <span>Giao diện tối</span>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked readOnly />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-3">
            <Bell size={20} className="text-secondary" />
            <span>Thông báo học tập</span>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
