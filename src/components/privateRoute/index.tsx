import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuth()!;
  const navigate = useNavigate();
  console.log("isLogin", isLogin);
  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    }
  }, [isLogin, navigate]);

  return isLogin ? <>{children}</> : <Navigate to="signin" />;
};
