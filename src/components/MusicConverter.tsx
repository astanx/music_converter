import React, { useState } from "react";
import { Music, useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";
import { useUserStore } from "../state/useUserStore.ts";
import Preloader from "./Preloader.tsx";

const MusicConverter: React.FC = () => {
  const convertMusic = useMusicStore((state) => state.convertMusic);
  const convertedMusic = useMusicStore((state) => state.convertedMusic);
  const [music, setMusic] = useState<Music[]>([]);
  const isLoading = useMusicStore((state) => state.isLoading);
  const [error, setError] = useState(null);

  const userId = useUserStore((state) => state.userId);

  const handleConvertMusic = async () => {
    if (music.length > 0) {
      const response = await convertMusic(music, userId);
      if (response.error) {
        setError(response.message);
      }
      setMusic([]);
    }
  };
  const handleFileChange = (e) => {
    setMusic((prevFiles) => [...prevFiles, e.target.files[0]]);
  };
  const handleDeleteFile = (file) => {
    setMusic((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="sheetMusic">Вставьте ноты:</label>
            <input
              type="file"
              className="form-control mt-2 mb-2"
              id="sheetMusic"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button
            className={`btn btn-primary btn-block ${
              isLoading ? "disabled" : ""
            }`}
            onClick={handleConvertMusic}
            disabled={isLoading}
          >
            {isLoading ? "Конвертация..." : "Конвертировать"}
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h3 className="text-center">Загруженные файлы:</h3>
          <ul className="list-group">
            {music.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{file.name}</span>
                <i
                  className="fas fa-times text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteFile(file)}
                ></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Результат:</h3>
          <div className="result-box border rounded p-3 text-center">
            {convertedMusic ? (
              <audio id="audioPlayer" controls>
                <source
                  id="audioSource"
                  src={`data:audio/wav;base64,${convertedMusic}`}
                  type="audio/wav"
                />
                Ваш браузер не поддерживает аудиоплеер.
              </audio>
            ) : (
              <p className="text-muted">{"Здесь будет музыка..."}</p>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MusicConverter);
