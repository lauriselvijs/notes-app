import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CLEAR_STATE,
  NOTES_LOADING,
} from "../actions/types";

const initialState = {
  notes: [],
  loading: false,
  error: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case NOTES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_STATE:
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
};

export default noteReducer;
