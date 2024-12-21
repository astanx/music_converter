import React from "react";
import { useMusicStore } from "../state/useMusicStore.ts";
import withAuth from "./hoc/withAuth.tsx";

const History = () => {
  const music = useMusicStore((state) => state.music);
  return (
    <div className="container mt-5">
      <h1 className="text-center">История</h1>
      <div className="list-group mt-4">
      {music.length > 0 ? music.map(mus => (
          <a href="#" className="list-group-item list-group-item-action">
            {mus}
          </a>
      )) : (
        <h2 className="text-center">Начните преобразовывать музыку</h2>
      )}
      </div>
    </div>
  );
};

export default withAuth(History);
