import { HeaderOnly } from "../Components/Header/HeaderOnly";
import { config } from "../Config";
import { ErrorPage } from "../Page/Error/ErrorPage";
import { Home } from "../Page/Home/Home";
import { Message } from "../Page/Message/Message";
import { UserDeatil } from "../Page/UserDetail/UserDeatil";
export const RouteSocial = [
  {
    path: config.route.home,
    component: Home,
    isAuthencatied: true,
  },

  {
    path: `${config.route.profile}/:username`,
    component: UserDeatil,
    layout: null,
    isAuthencatied: true,
  },
  {
    path: config.route.messgae,
    component: Message,
    layout: HeaderOnly,
  },
  {
    path: "*",
    component: ErrorPage,
    layout: null,
  },
];
