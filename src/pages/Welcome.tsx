import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động chuyển về trang chủ sau 5 giây
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-black text-white text-center p-4">
      <div className="bg-light-dark p-5 rounded-4 shadow-lg border border-secondary border-opacity-25" style={{ maxWidth: '500px' }}>
        <div className="mb-4 d-flex justify-content-center">
          <div className="bg-primary bg-opacity-20 p-4 rounded-circle">
            <CheckCircle size={60} className="text-primary" />
          </div>
        </div>
        <h2 className="fw-bold mb-3">Xác nhận thành công!</h2>
        <p className="text-secondary mb-4 fs-5">
          Chào mừng bạn đến với <strong>Suzubun</strong>. Tài khoản của bạn đã được kích hoạt và sẵn sàng để học tiếng Nhật.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary btn-lg rounded-pill px-5 fw-bold hover-scale transition-all d-flex align-items-center mx-auto"
        >
          Bắt đầu học ngay <ArrowRight size={20} className="ms-2" />
        </button>
        <p className="mt-4 text-secondary small">Bạn sẽ được tự động chuyển trang sau vài giây...</p>
      </div>
    </div>
  );
};

export default Welcome;
