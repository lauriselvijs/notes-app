import { Errors } from "../action-types/errorActionsTypes";
import { ErrorAction } from "../actions/errorActions";

interface IinitialState {
  msg: { msg: string };
  status: string | null;
  id?: string | null;
}

const initialState: IinitialState = {
  msg: { msg: "" },
  status: null,
  id: null,
};

const errorReducer = (
  state = initialState,
  action: ErrorAction
): IinitialState => {
  switch (action.type) {
    case Errors.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case Errors.CLEAR_ERRORS:
      return {
        msg: { msg: "" },
        status: null,
        id: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
