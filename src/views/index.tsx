import { lazy } from "react";

const Home = lazy(() => import("./home/view"));
const Cash = lazy(() => import("./cash/view"));
const Phone = lazy(() => import("./phone/view"));
const Login = lazy(() => import("./auth/login"));

export { Home, Login, Cash, Phone };
