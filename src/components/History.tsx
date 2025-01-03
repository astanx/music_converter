import React, { useEffect } from "react";
import { useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";
import { useUserStore } from "../state/useUserStore.ts";

const History = () => {
  const music = useMusicStore((state) => state.music);
  const setMusic = useMusicStore((state) => state.setMusic);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    setMusic(userId);
  }, [setMusic, userId]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">История</h1>
      <div className="list-group mt-4">
        {music.length > 0 ? (
          music.map((mus, index) => (
            <div className="mt-3 text-center" key={index}>
              <audio controls className="w-50 rounded">
                <source src={`data:audio/wav;base64,${mus.music}`} type="audio/wav" />
                Ваш браузер не поддерживает аудиоплеер.
              </audio>
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