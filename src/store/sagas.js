import { all, fork } from "redux-saga/effects";

//public
import ForgetSaga from "./auth/forgetpwd/saga";
import AuthSaga from "./auth/login/saga";
import ProfileSaga from "./auth/profile/saga";
import AccountSaga from "./auth/register/saga";
import chatSaga from "./chat/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import dashboardSaga from "./dashboard/saga";
import LayoutSaga from "./layout/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(chatSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
  ]);
}
