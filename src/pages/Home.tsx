import { useEffect, useState } from 'react';
import { contentApi } from '../api/contentService';
import type { Content } from '../api/contentService';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen } from 'lucide-react';

const Home = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    contentApi.getList({ pageNumber: 1, pageSize: 20 }).then(res => {
      setContents(res.data.items);
    });
  }, []);

  return (
    <div>
      <h1 className="fw-bold mb-4">Chào buổi sáng</h1>
      
      <div className="mb-5">
        <h3 className="fw-bold mb-3">Dành cho bạn</h3>
        <div className="row g-4">
          {contents.map(item => (
            <div key={item.id} className="col-md-4 col-lg-3">
              <Link 
                to={item.contentType === 'music' ? `/music/${item.id}` : `/reader/${item.id}`}
                className="text-decoration-none text-white"
              >
                <div className="bg-light-dark p-3 rounded-3 hover-scale transition-all shadow h-100">
                  <div className="position-relative mb-3 overflow-hidden rounded-3 shadow">
                    <img 
                      src={item.thumbnailUrl || 'https://via.placeholder.com/300'} 
                      className="w-100 h-100" 
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                      alt={item.title} 
                    />
                    <div className="position-absolute bottom-0 end-0 m-2 shadow-lg rounded-circle bg-primary p-2">
                      {item.contentType === 'music' ? <PlayCircle size={20} /> : <BookOpen size={20} />}
                    </div>
                  </div>
                  <h6 className="fw-bold text-truncate m-0">{item.title}</h6>
                  <small className="text-secondary">{item.description || 'Học tiếng Nhật qua nội dung mới.'}</small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
