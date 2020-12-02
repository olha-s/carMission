import { SAVE_ERROR_OBJECT, CLEAR_ERROR_OBJECT } from "./actionTypes"

const initialStore = {
  err: null
};

export default function reducer (store = initialStore, { type, payload }) {
  switch (type) {

    case SAVE_ERROR_OBJECT:
      return { err: payload } ;

    case CLEAR_ERROR_OBJECT:
      return { err: null };

    default:
      return store

  }
}