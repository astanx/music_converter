import React, { useState } from "react";
import { Music, useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";
import { useUserStore } from "../state/useUserStore.ts";

const MusicConverter: React.FC = () => {
  const convertMusic = useMusicStore((state) => state.convertMusic);
  const [music, setMusic] = useState<Music[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedMusic, setConvertedMusic] = useState("");
  const userId = useUserStore((state) => state.userId)

  const handleConvertMusic = async () => {
    if (music.length > 0) {
      setIsConverting(true)
      setConvertedMusic(await convertMusic(music, userId));
      setMusic([])
      setIsConverting(false)
    }
  };
  const handleFileChange = (e) => {
    setMusic((prevFiles) => [...prevFiles, e.target.files[0]]);
    setConvertedMusic("");
  };
  const handleDeleteFile = (file) => {
    setMusic((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  };

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
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={handleConvertMusic}
            disabled={isConverting}
          >
            Конвертировать
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h3>Загруженные файлы:</h3>
          <ul>
            {music.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <i
                  className="fas fa-times m-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteFile(file)}
                ></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Результат:</h3>
          <div className="result-box border p-3">
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
              <p>{"Здесь будет музыка..."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MusicConverter);
