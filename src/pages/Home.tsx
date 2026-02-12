import { useEffect, useState } from 'react';
import { contentApi } from '../api/contentService';
import type { Content } from '../api/contentService';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Home = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    contentApi.getList({ pageNumber: 1, pageSize: 20 }).then(res => {
      setContents(res.data.items);
    });
  }, []);

  return (
    <div className="py-2">
      <h2 className="mb-4 px-2">Chào ngày mới tốt lành</h2>
      
      <div className="row g-4">
        {contents.length > 0 ? (
          contents.map(item => (
            <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
              <Link to={item.contentType === 'music' ? `/music/${item.id}` : `/reader/${item.id}`} className="text-decoration-none">
                <div className="content-card shadow">
                  <div className="img-container">
                    <img 
                      src={item.thumbnailUrl || `https://picsum.photos/seed/${item.id}/300`} 
                      className="w-100 aspect-square object-fit-cover"
                      alt={item.title} 
                    />
                    <div className="play-button-overlay">
                      <Play size={24} fill="black" />
                    </div>
                  </div>
                  <h6 className="fw-bold text-white text-truncate m-0 mb-1">{item.title}</h6>
                  <p className="text-grey x-small text-truncate m-0">{item.description || 'Bài học Suzubun'}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-5 text-grey">
            <p>Chưa có nội dung nào được đăng.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
