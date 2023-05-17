import React from "react";
import { Redirect } from "react-router-dom";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/user-profile";
import Chat from "../pages/Chat/Chat";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesMaintenance from "../pages/Utility/pages-maintenance";

const authProtectedRoutes = [
  { path: "/dashboard", component: () => <Redirect to="/chat" /> },
  { path: "/chat", component: Chat },
  { path: "/profile", component: UserProfile },
  { path: "/", exact: true, component: () => <Redirect to="/chat" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
];

export { authProtectedRoutes, publicRoutes };
