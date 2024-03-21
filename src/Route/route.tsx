import { config } from "@/Config";
import { Home } from "@/Page/Home/Home";
import { Login } from "@/Page/Login/Login";
import { Register } from "@/Page/Register/Register";

export const publicRoute = [
  {
    path: config.route.home,
    component: Home,
  },
  {
    path: config.route.login,
    component: Login,
  },
  {
    path: config.route.register,
    component: Register,
  },
];

//check user has account
export const privateRoutes = [];
