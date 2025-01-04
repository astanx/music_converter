import React, { useEffect } from "react";
import { useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";
import { useUserStore } from "../state/useUserStore.ts";
import Preloader from "./Preloader.tsx";

const History = () => {
  const music = useMusicStore((state) => state.music);
  const setMusic = useMusicStore((state) => state.setMusic);
  const clearHistory = useMusicStore((state) => state.clearHistory);
  const userId = useUserStore((state) => state.userId);
  const isLoading = useMusicStore((state) => state.isLoading);
  const deleteMusic = useMusicStore((state) => state.deleteMusic)

  useEffect(() => {
    const fetchData = async () => {
      await setMusic(userId);
    };
    fetchData();
    return () => {
      clearHistory();
    };
  }, [setMusic, clearHistory, userId]);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="container mt-5">
      <h1 className="text-center">История</h1>
      <div className="list-group mt-4">
        {music.length > 0 ? (
          music.map((mus, index) => (
            <div className="mt-3 row justify-content-center" key={index}>
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <audio controls className="w-100 rounded">
                    <source
                      src={`data:audio/wav;base64,${mus.music}`}
                      type="audio/wav"
                    />
                    Ваш браузер не поддерживает аудиоплеер.
                  </audio>
                  <div className="ml-2">
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: "pointer" }}
                      aria-hidden="true"
                      onClick={() => deleteMusic(mus.id)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center">Начните преобразовывать музыку</h2>
        )}
      </div>
    </div>
  );
};

export default withAuth(History);
