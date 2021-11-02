import { Notes } from "../action-types/noteActionsTypes";

interface GetNotes {
  type: Notes.GET_NOTES;
  payload: { _id: string; text: string; author: string; subject: string }[];
}

interface DeleteNote {
  type: Notes.DELETE_NOTE;
  payload: string;
}

interface AddNote {
  type: Notes.ADD_NOTE;
  payload: { _id: string; text: string; author: string; subject: string };
}

interface NotesLoading {
  type: Notes.NOTES_LOADING;
}

interface ClearState {
  type: Notes.CLEAR_STATE;
}

export type NotesAction =
  | GetNotes
  | DeleteNote
  | AddNote
  | NotesLoading
  | ClearState;
