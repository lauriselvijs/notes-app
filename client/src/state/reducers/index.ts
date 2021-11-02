import { combineReducers } from "redux";
import noteReducer from "./noteReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const reducers = combineReducers({
  note: noteReducer,
  auth: authReducer,
  error: errorReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
