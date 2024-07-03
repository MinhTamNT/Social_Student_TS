import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";

interface IProp {
  children: ReactElement;
}

export const RequireAuth = ({ children }: IProp) => {
  const accessToken = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  return accessToken?.access_token === null ? (
    <Navigate to={"/login"} />
  ) : (
    children
  );
};
