import { config } from "../Config";
import { Home } from "../Page/Home/Home";
import { Login } from "../Page/Login/Login";
import { Register } from "../Page/Register/Register";
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
];
