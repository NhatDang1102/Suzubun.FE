import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { contentApi } from '../api/contentService';
import type { Content, ContentLine } from '../api/contentService';
import { Loader2, Languages, Volume2 } from 'lucide-react';

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ content: Content; lines: ContentLine[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);

  useEffect(() => {
    if (id) {
      contentApi.getDetail(id).then(res => {
        setData(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleWordClick = async (word: string, context: string) => {
    setLookupResult({ word, loading: true });
    try {
      const res = await contentApi.lookupWord(word, context);
      setLookupResult({ word, ...res.data, loading: false });
    } catch (err) {
      setLookupResult(null);
    }
  };

  if (loading) return <div className="d-flex justify-content-center p-5"><Loader2 className="animate-spin" /></div>;
  if (!data) return <div>Không tìm thấy nội dung.</div>;

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">{data.content.title}</h1>
        <div className="d-flex gap-2 mb-4">
          <button 
            className={`btn btn-sm ${showTranslation ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <Languages size={16} className="me-2" />
            {showTranslation ? 'Ẩn dịch' : 'Hiện dịch'}
          </button>
        </div>
      </div>

      <div className="japanese-text">
        {data.lines.map(line => (
          <div key={line.id} className="mb-4 group">
            <p className="mb-1">
              {line.textJp.split('').map((char, i) => (
                <span 
                  key={i} 
                  className="word-span"
                  onClick={() => handleWordClick(char, line.textJp)}
                >
                  {char}
                </span>
              ))}
            </p>
            {showTranslation && (
              <p className="text-secondary small fst-italic transition-all opacity-75">
                {line.textVi || 'Đang cập nhật bản dịch...'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Pop-up Tra từ */}
      {lookupResult && (
        <div className="fixed-bottom m-4 p-4 bg-light-dark rounded-4 shadow-lg border border-secondary border-opacity-25" style={{ maxWidth: '400px', zIndex: 1050 }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h4 className="m-0 fw-bold text-primary">{lookupResult.word}</h4>
            <button className="btn-close btn-close-white btn-sm" onClick={() => setLookupResult(null)}></button>
          </div>
          {lookupResult.loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div>
              <p className="mb-1 text-info fw-medium">{lookupResult.sinoVietnamese} (Hán Việt)</p>
              <p className="mb-3 fs-5">{lookupResult.translation}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm rounded-pill px-3">Lưu vào Flashcard</button>
                <button className="btn btn-outline-light btn-sm rounded-pill"><Volume2 size={14} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reader;
