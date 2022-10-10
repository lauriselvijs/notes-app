import { Notes } from "../action-types/noteActionsTypes";
import { NotesAction } from "../actions/noteActions";

interface IinitialState {
  notes: { _id: string; text: string; author: string; subject: string }[];
  loading: boolean;
  error: [];
}

const initialState: IinitialState = {
  notes: [],
  loading: false,
  error: [],
};

const noteReducer = (
  state = initialState,
  action: NotesAction
): IinitialState => {
  switch (action.type) {
    case Notes.GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case Notes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(
          (note: { _id?: string }) => note._id !== action.payload
        ),
      };
    case Notes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case Notes.NOTES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Notes.CLEAR_STATE:
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
};

export default noteReducer;
