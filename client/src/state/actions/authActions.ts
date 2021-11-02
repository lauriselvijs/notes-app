import { Auth } from "../action-types/authActionTypes";

interface UserLoading {
  type: Auth.USER_LOADING;
}

interface UserLoaded {
  type: Auth.USER_LOADED;
  payload: {};
}

interface LoginSuccess {
  type: Auth.LOGIN_SUCCESS;
  payload: { token: string };
}

interface RegisterSuccess {
  type: Auth.REGISTER_SUCCESS;
  payload: { token: string };
}

interface AuthError {
  type: Auth.AUTH_ERROR;
}

interface LogoutSuccess {
  type: Auth.LOGOUT_SUCCESS;
}

interface RegisterFail {
  type: Auth.REGISTER_FAIL;
}

export type AuthActions =
  | UserLoading
  | UserLoaded
  | LogoutSuccess
  | LoginSuccess
  | RegisterSuccess
  | RegisterFail
  | AuthError;
