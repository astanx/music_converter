import React, { useEffect } from "react";
import { useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";
import { useUserStore } from "../state/useUserStore.ts";
import Preloader from "./Preloader.tsx";
import Pagination from "./Pagination.tsx";

const History = () => {

  const music = useMusicStore((state) => state.music);
  const userId = useUserStore((state) => state.userId);
  const isLoading = useMusicStore((state) => state.isLoading);
  const currentPage = useMusicStore((state) => state.currentPage);
  const pageSize = useMusicStore((state) => state.pageSize);

  const setMusic = useMusicStore((state) => state.setMusic);
  const clearHistory = useMusicStore((state) => state.clearHistory);
  const deleteMusic = useMusicStore((state) => state.deleteMusic);

  useEffect(() => {
    const fetchData = async () => {
      await setMusic(userId, currentPage, pageSize);
    };
    fetchData();
    return () => {
      clearHistory();
    };
  }, [setMusic, clearHistory, userId, currentPage, pageSize]);
  return isLoading ? (
    <Preloader />
  ) : (
    <div className="container mt-5">
      <h1 className="text-center">История</h1>
      <div className="list-group mt-4">
        {music.length > 0 ? (
          music.map((mus) => (
            <div className="mt-3 row justify-content-center" key={mus.id}>
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <audio controls className="w-100 rounded">
                    <source
                      src={mus.url}
                      type="audio/wav"
                    />
                    Ваш браузер не поддерживает аудиоплеер.
                  </audio>
                  <div className="ml-2">
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: "pointer" }}
                      aria-hidden="true"
                      onClick={() => deleteMusic(userId, mus.id, pageSize)}
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
      {music.length > 0 && <Pagination />}
    </div>
  );
};

export default withAuth(History);
