import React, { useState } from 'react';
import { supabase } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName }
          }
        });
        if (error) throw error;
        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black">
      <div className="bg-light-dark p-5 rounded-4 shadow-lg border border-secondary border-opacity-25" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary d-inline-flex p-3 rounded-circle mb-3 shadow">
            <span className="fw-bold text-white fs-3">S</span>
          </div>
          <h3 className="fw-bold">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h3>
          <p className="text-secondary">Chào mừng bạn đến với Suzubun</p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {!isLogin && (
            <div>
              <label className="form-label small fw-bold text-secondary">Họ và tên</label>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary border-opacity-50 py-2"
                placeholder="Nhập tên hiển thị"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
          )}
          <div>
            <label className="form-label small fw-bold text-secondary">Email</label>
            <input 
              type="email" 
              className="form-control bg-dark text-white border-secondary border-opacity-50 py-2"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="form-label small fw-bold text-secondary">Mật khẩu</label>
            <input 
              type="password" 
              className="form-control bg-dark text-white border-secondary border-opacity-50 py-2"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary fw-bold py-2 mt-2 rounded-pill hover-scale transition-all" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mx-auto" /> : (isLogin ? 'Đăng nhập' : 'Tạo tài khoản')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <small className="text-secondary">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <span 
              className="text-white fw-bold cursor-pointer text-decoration-underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Auth;
