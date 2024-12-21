import React, {useState} from 'react';
import { Music, useMusicStore } from '../state/useMusicStore.ts';
import withAuth from './hoc/withAuth.tsx';

const MusicConverter: React.FC = () => {
  const convertMusic = useMusicStore((state) => state.convertMusic)
  const [music, setMusic] = useState('')
  const [converterMusic, setConverterMusic] = useState('')
  const handleConvertMusic = (music: Music) => {
    setConverterMusic(convertMusic(music))
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="sheetMusic">Вставьте ноты:</label>
            <input
              type="file"
              className="form-control mt-2 mb-2"
              id="sheetMusic"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => handleConvertMusic(music)}>Конвертировать</button>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h3>Результат:</h3>
          <div className="result-box border p-3">
         <p>{converterMusic || "Здесь будет музыка..."}</p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MusicConverter);