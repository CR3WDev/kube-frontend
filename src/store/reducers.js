import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import ForgetPassword from "./auth/forgetpwd/reducer";
import Login from "./auth/login/reducer";
import Profile from "./auth/profile/reducer";
import Account from "./auth/register/reducer";

//chat
import chat from "./chat/reducer";

//Dashboard
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

const rootReducer = combineReducers({
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  chat,
  Dashboard,
  DashboardSaas,
});

export default rootReducer;
