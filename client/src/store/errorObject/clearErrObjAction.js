import { CLEAR_ERROR_OBJECT } from "./actionTypes"

export const clearErrObjAction = () => {
  return {
    type: CLEAR_ERROR_OBJECT,
    payload: null
  }
}