import Home from "../page/home";
import Register from "../page/register";
import History from "../page/history";
import Login from "../page/login";

const publicRouters = [
  {
    path: "/",
    component: Home,
    login:  true
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/history",
    component: History,
    login: true
  },
];

export { publicRouters };
