import { Auth } from "../action-types/authActionTypes";
import { AuthActions } from "../actions/authActions";

interface IinitialState {
  token: string | null;
  isAuthenticated: any;
  isLoading: boolean;
  user: any;
}

const initialState: IinitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case Auth.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Auth.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case Auth.LOGIN_SUCCESS:
    case Auth.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case Auth.AUTH_ERROR:
    case Auth.LOGIN_SUCCESS:
    case Auth.LOGOUT_SUCCESS:
    case Auth.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
