import { Errors } from "../action-types/errorActionsTypes";

interface ReturnErrors {
  type: Errors.GET_ERRORS;
  payload: { msg: { msg: string }; status: string; id?: string };
}

interface ClearErrors {
  type: Errors.CLEAR_ERRORS;
}

export type ErrorAction = ReturnErrors | ClearErrors;
