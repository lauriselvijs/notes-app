import axios from "axios";
import { returnErrors } from "../action-creators/errorActionsCreators";
import { Auth } from "../action-types/authActionTypes";
import { Dispatch } from "redux";
import { AuthActions } from "../actions/authActions";

// Check token and load user
export const loadUser =
  () => async (dispatch: Dispatch<AuthActions | any>, getState: () => any) => {
    // User loading
    dispatch({ type: Auth.USER_LOADING });

    function onSuccess(success: {}) {
      dispatch({ type: Auth.USER_LOADED, payload: success });
      return success;
    }
    function onError() {
      dispatch({ type: Auth.AUTH_ERROR });
    }
    try {
      const success = await axios.get(
        "/api/v1/auth/user",
        tokenConfig(getState)
      );
      return onSuccess(success.data);
    } catch (error: any) {
      dispatch(returnErrors(error.response.data, error.response.status));
      return onError();
    }
  };

// Register user
export const register =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: Dispatch<AuthActions | any>) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    function onSuccess(res: {}) {
      dispatch({ type: Auth.REGISTER_SUCCESS, payload: res });
      return res;
    }
    function onError(error: any) {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({ type: Auth.REGISTER_FAIL });
      return error;
    }

    try {
      const res = await axios.post("/api/v1/users", body, config);
      return onSuccess(res.data);
    } catch (error) {
      return onError(error);
    }
  };

// Login User
export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActions | any>) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    function onSuccess(res: any) {
      dispatch({ type: Auth.LOGIN_SUCCESS, payload: res });
      return res;
    }
    function onError(error: any) {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: Auth.LOGIN_FAIL });
      return error;
    }

    try {
      const res = await axios.post("/api/v1/auth", body, config);
      return onSuccess(res.data);
    } catch (error) {
      return onError(error);
    }
  };

// Logout user
export const logout = () => (dispatch: Dispatch<AuthActions | any>) => {
  dispatch({ type: Auth.LOGOUT_SUCCESS });
};

// Setup config/headers and token
export const tokenConfig = (getState: () => any) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config: any = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
