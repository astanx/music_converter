import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/useUserStore.ts";

const withAuth = (WrappedComponent) => {
  let WithAuthComponent = (props) => {
    const isLogined = useUserStore((state) => state.isLogined);

    const navigate = useNavigate();
    useEffect(() => {
      if (!isLogined) {
        navigate("/login");
      }
    }, [isLogined, navigate]);

    return <WrappedComponent {...props} />;
  };
  return WithAuthComponent;
};

export default withAuth;
