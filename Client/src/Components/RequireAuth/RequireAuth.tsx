import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";

interface IProp {
  children: ReactNode;
}

export const RequireAuth = ({ children }: IProp) => {
  const accessToken = useSelector(
    (state: RootState) => state.auth.login.currentUser
  );

  if (!accessToken?.access_token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
