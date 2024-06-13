import { config } from "../Config";
import { ErrorPage } from "../Page/Error/ErrorPage";
import { Home } from "../Page/Home/Home";
import { Login } from "../Page/Login/Login";
import { Register } from "../Page/Register/Register";
import { UserDeatil } from "../Page/UserDetail/UserDeatil";
export const RouteSocial = [
  {
    path: config.route.home,
    component: Home,
    isAuthencatied: true,
  },
  {
    path: config.route.login,
    component: Login,
    layout: null,
  },
  {
    path: config.route.register,
    component: Register,
    layout: null,
  },
  {
    path: `${config.route.profile}/:username`,
    component: UserDeatil,
    layout: null,
    isAuthencatied: true,
  },
  {
    path: "*",
    component: ErrorPage,
    layout: null,
  },
];
