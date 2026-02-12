import { useEffect, useState } from 'react';
import { adminApi } from '../api/adminService';
import { Plus, FileText, Music as MusicIcon, List, Eye, EyeOff, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'article' | 'music' | 'category'>('list');
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contRes, catRes] = await Promise.all([
        adminApi.getList({ pageNumber: 1, pageSize: 50 }),
        adminApi.getCategories()
      ]);
      setItems(contRes.data.items);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await adminApi.updateStatus(id, !currentStatus);
    fetchData();
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Quản trị hệ thống</h2>

      <div className="d-flex gap-3 mb-4 overflow-auto pb-2">
        <button onClick={() => setActiveTab('list')} className={`btn rounded-pill px-4 ${activeTab === 'list' ? 'btn-primary' : 'btn-dark'}`}>
          <List size={18} className="me-2" /> Danh sách
        </button>
        <button onClick={() => setActiveTab('article')} className={`btn rounded-pill px-4 ${activeTab === 'article' ? 'btn-primary' : 'btn-dark'}`}>
          <Plus size={18} className="me-2" /> Đăng bài báo
        </button>
        <button onClick={() => setActiveTab('music')} className={`btn rounded-pill px-4 ${activeTab === 'music' ? 'btn-primary' : 'btn-dark'}`}>
          <Plus size={18} className="me-2" /> Đăng nhạc
        </button>
        <button onClick={() => setActiveTab('category')} className={`btn rounded-pill px-4 ${activeTab === 'category' ? 'btn-primary' : 'btn-dark'}`}>
          <Plus size={18} className="me-2" /> Danh mục
        </button>
      </div>

      <div className="bg-light-dark p-4 rounded-4 shadow">
        {activeTab === 'list' && (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Loại</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><div className="fw-bold">{item.title}</div></td>
                    <td>{item.contentType === 'article' ? <FileText size={16} /> : <MusicIcon size={16} />}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <span className={`badge rounded-pill ${item.isPublished ? 'bg-success' : 'bg-secondary'}`}>
                        {item.isPublished ? 'Đang hiện' : 'Đang ẩn'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleToggleStatus(item.id, item.isPublished)} className="btn btn-sm btn-outline-light">
                        {item.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'article' && <ArticleForm categories={categories} onSuccess={fetchData} />}
        {activeTab === 'music' && <MusicForm categories={categories} onSuccess={fetchData} />}
        {activeTab === 'category' && <CategoryManager categories={categories} onSuccess={fetchData} />}
      </div>
    </div>
  );
};

// Form components (Tóm gọn để tránh code quá dài)
const ArticleForm = ({ categories, onSuccess }: any) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    await adminApi.uploadArticle(formData);
    setLoading(false);
    onSuccess();
    alert('Đã đăng bài báo thành công!');
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label small">Tiêu đề</label>
        <input name="Title" className="form-control bg-dark text-white border-secondary" required />
      </div>
      <div className="col-md-6">
        <label className="form-label small">Danh mục</label>
        <select name="CategoryId" className="form-select bg-dark text-white border-secondary" required>
          {categories.filter((c:any) => c.type === 'article').map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label small">Nội dung tiếng Nhật</label>
        <textarea name="Body" className="form-control bg-dark text-white border-secondary" rows={10} required></textarea>
      </div>
      <div className="col-md-6">
        <label className="form-label small">Ảnh bìa</label>
        <input type="file" name="Thumbnail" className="form-control bg-dark text-white border-secondary" />
      </div>
      <div className="col-md-6">
        <label className="form-label small">File Audio (Optional)</label>
        <input type="file" name="Audio" className="form-control bg-dark text-white border-secondary" />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary px-5 rounded-pill" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : 'Lưu bài báo'}
        </button>
      </div>
    </form>
  );
};

const MusicForm = ({ categories, onSuccess }: any) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    await adminApi.uploadMusic(formData);
    setLoading(false);
    onSuccess();
    alert('Đã đăng nhạc thành công!');
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-4">
        <label className="form-label small">Tên bài hát</label>
        <input name="Title" className="form-control bg-dark text-white border-secondary" required />
      </div>
      <div className="col-md-4">
        <label className="form-label small">Ca sĩ</label>
        <input name="Artist" className="form-control bg-dark text-white border-secondary" />
      </div>
      <div className="col-md-4">
        <label className="form-label small">Danh mục</label>
        <select name="CategoryId" className="form-select bg-dark text-white border-secondary" required>
          {categories.filter((c:any) => c.type === 'music').map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label small">File nhạc (.mp3, .aac...)</label>
        <input type="file" name="AudioFile" className="form-control bg-dark text-white border-secondary" required />
      </div>
      <div className="col-md-4">
        <label className="form-label small">File Lyrics (.lrc)</label>
        <input type="file" name="LrcFile" className="form-control bg-dark text-white border-secondary" />
      </div>
      <div className="col-md-4">
        <label className="form-label small">Ảnh Thumbnail</label>
        <input type="file" name="Thumbnail" className="form-control bg-dark text-white border-secondary" />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary px-5 rounded-pill" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : 'Lưu bài nhạc'}
        </button>
      </div>
    </form>
  );
};

const CategoryManager = ({ categories, onSuccess }: any) => {
  const [newName, setNewName] = useState('');
  const [type, setType] = useState('article');

  const handleAdd = async () => {
    await adminApi.createCategory(newName, type);
    setNewName('');
    onSuccess();
  };

  return (
    <div>
      <div className="d-flex gap-2 mb-4">
        <input value={newName} onChange={e => setNewName(e.target.value)} className="form-control bg-dark text-white w-25" placeholder="Tên danh mục mới" />
        <select value={type} onChange={e => setType(e.target.value)} className="form-select bg-dark text-white w-25">
          <option value="article">Bài báo</option>
          <option value="music">Âm nhạc</option>
        </select>
        <button onClick={handleAdd} className="btn btn-primary">Thêm</button>
      </div>
      <ul className="list-group list-group-flush">
        {categories.map((c:any) => (
          <li key={c.id} className="list-group-item bg-transparent text-white border-secondary border-opacity-25 d-flex justify-content-between">
            <span>{c.name} ({c.type})</span>
            <button onClick={async () => { await adminApi.deleteCategory(c.id); onSuccess(); }} className="btn btn-sm btn-danger">Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
