import axios from "axios";
import { Notes } from "../action-types/noteActionsTypes";

import { tokenConfig } from "../action-creators/authActionCreators";
import { Dispatch } from "redux";
import { NotesAction } from "../actions/noteActions";
import { returnErrors } from "./errorActionsCreators";

export const getNotes =
  () => async (dispatch: Dispatch<NotesAction | any>, getState: () => void) => {
    function onSuccess(success: {}) {
      dispatch({ type: Notes.GET_NOTES, payload: success });
      return success;
    }
    function onError(error: any) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
    try {
      dispatch(setNotesLoading());
      const success = await axios.get("/api/v1/notes", tokenConfig(getState));
      return onSuccess(success.data.data);
    } catch (error: any) {
      return onError(error);
    }
  };

export const addNote =
  (note: {}) =>
  async (dispatch: Dispatch<NotesAction | any>, getState: () => void) => {
    function onSuccess() {
      dispatch({ type: Notes.ADD_NOTE, payload: note });
      return note;
    }
    function onError(error: any) {
      dispatch(returnErrors(error.response.data, error.response.status));
      return error;
    }
    try {
      await axios.post("/api/v1/notes", note, tokenConfig(getState));
      return onSuccess();
    } catch (error) {
      return onError(error);
    }
  };

export const deleteNote =
  (id: string) =>
  async (dispatch: Dispatch<NotesAction | any>, getState: () => void) => {
    function onSuccess() {
      dispatch({ type: Notes.DELETE_NOTE, payload: id });
      return id;
    }
    function onError(error: any) {
      dispatch(returnErrors(error.response.data, error.response.status));
      return error;
    }
    try {
      await axios.delete(`/api/v1/notes/${id}`, tokenConfig(getState));
      return onSuccess();
    } catch (error) {
      return onError(error);
    }
  };

export const clearState = () => (dispatch: Dispatch<NotesAction>) => {
  dispatch({
    type: Notes.CLEAR_STATE,
  });
};

export const setNotesLoading = () => {
  return {
    type: Notes.NOTES_LOADING,
  };
};
