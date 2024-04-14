import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";
import {
  getUserFail,
  getUserStart,
  getUserSucess,
} from "../../Redux/userSlice";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";

interface IProp {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: IProp) => {
  const dispatch = useDispatch();
  const authUser = useSelector(
    (state: RootState) => state.auth?.login?.currentUser
  );
  const isAuth = useSelector(
    (state: RootState) => state?.auth?.login?.isFetching
  );
  console.log(isAuth);

  if (isAuth === false && !authUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const getUser = async () => {
      dispatch(getUserStart());
      try {
        const res = await AuthAPI(authUser?.access_token).get(
          endpoints["current_user"]
        );
        dispatch(getUserSucess(res.data));
      } catch (error) {
        console.log(error);
        dispatch(getUserFail());
      }
    };
    getUser();
  }, [authUser?.access_token]);

  return children;
};

export default ProtectedRoute;
