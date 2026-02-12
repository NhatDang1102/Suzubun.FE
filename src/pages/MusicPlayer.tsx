import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { contentApi } from '../api/contentService';
import type { Content, ContentLine } from '../api/contentService';

const MusicPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ content: Content; lines: ContentLine[] } | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (id) {
      contentApi.getDetail(id).then(res => setData(res.data));
    }
  }, [id]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  if (!data) return null;

  return (
    <div className="row h-100 g-0">
      {/* Album Art Section */}
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center p-5">
        <img 
          src={data.content.thumbnailUrl || 'https://via.placeholder.com/400'} 
          className="rounded-4 shadow-lg w-100 mb-4 transition-all" 
          style={{ maxWidth: '400px', aspectRatio: '1/1', objectFit: 'cover' }}
          alt="album art" 
        />
        <div className="text-center">
          <h2 className="fw-bold mb-1">{data.content.title}</h2>
          <p className="text-secondary fs-5">{data.content.metadata?.artist || 'Unknown Artist'}</p>
        </div>
      </div>

      {/* Lyrics Section */}
      <div className="col-md-7 h-100 overflow-auto py-5 px-4 custom-scrollbar">
        <div className="lyrics-container">
          {data.lines.map((line, index) => {
            const isActive = currentTime >= line.startTime && (index === data.lines.length - 1 || currentTime < data.lines[index+1].startTime);
            return (
              <p 
                key={line.id} 
                className={`fs-2 fw-bold mb-4 transition-all lyric-line ${isActive ? 'text-white' : 'text-secondary opacity-25'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = line.startTime;
                }}
              >
                {line.textJp}
              </p>
            );
          })}
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={data.content.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default MusicPlayer;
