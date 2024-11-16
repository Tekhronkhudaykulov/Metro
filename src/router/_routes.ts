import { APP_ROUTES } from ".";
import { Cash, Home, Login, Phone } from "../views";

export const _routes = [
  {
    path: APP_ROUTES.HOME,
    element: Home,
    exact: true,
  },
  {
    path: APP_ROUTES.CASH,
    element: Cash,
  },
  {
    path: APP_ROUTES.PHONE,
    element: Phone,
  },
];

export const _auth_routes = [
  {
    path: APP_ROUTES.LOGIN,
    element: Login,
  },
];