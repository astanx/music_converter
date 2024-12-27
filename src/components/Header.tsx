import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../state/useUserStore.ts";

const Header = () => {
  const userName = useUserStore((state) => state.userName);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const isLogined = useUserStore((state) => state.isLogined);
  return (
    <header className="row align-items-center p-3">
      <div className="col-3">
        <Link to="/" className="btn btn-link text-dark">
          <i className="fas fa-home icon-large"></i>
        </Link>
        <Link to="/history" className="btn btn-link text-dark">
          <i className="fas fa-history icon-large"></i>
        </Link>
      </div>
      <h1 className="col-6">Преобразователь музыки</h1>
      {isLogined && (
        <div className="col-3 text-end">
          <span className="fs-4">{userName}</span>
          <div className="small">
            <span style={{ cursor: "pointer" }} onClick={logoutUser}>
              Выйти
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
