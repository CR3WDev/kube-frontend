import React from "react";
import { Redirect } from "react-router-dom";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/user-profile";
import Chat from "../pages/Chat/Chat";

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
];

export { authProtectedRoutes, publicRoutes };
