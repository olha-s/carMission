import { SAVE_ERROR_OBJECT } from "./actionTypes";

export const saveErrObjAction = (err) => {
  console.log("error object - - - ", err);
  return {
    type: SAVE_ERROR_OBJECT,
    payload: err,
  };
};
