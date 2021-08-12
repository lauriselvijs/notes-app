import axios from "axios";
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  NOTES_LOADING,
  CLEAR_STATE,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getNotes = () => async (dispatch, getState) => {
  function onSuccess(success) {
    dispatch({ type: GET_NOTES, payload: success });
    return success;
  }
  function onError(error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  try {
    dispatch(setNotesLoading());
    const success = await axios.get("/api/v1/notes", tokenConfig(getState));
    return onSuccess(success.data.data);
  } catch (error) {
    return onError(error);
  }
};

export const addNote = (note) => async (dispatch, getState) => {
  function onSuccess() {
    dispatch({ type: ADD_NOTE, payload: note });
    return note;
  }
  function onError(error) {
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

export const deleteNote = (id) => async (dispatch, getState) => {
  function onSuccess() {
    dispatch({ type: DELETE_NOTE, payload: id });
    return id;
  }
  function onError(error) {
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

export const clearState = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};

export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING,
  };
};
