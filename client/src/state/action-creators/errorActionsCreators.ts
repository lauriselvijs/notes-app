import { Errors } from "../action-types/errorActionsTypes";

// Return errors
export const returnErrors = (msg: string, status: string, id?: string) => {
  return {
    type: Errors.GET_ERRORS,
    payload: { msg, status, id },
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: Errors.CLEAR_ERRORS,
  };
};
