import {OPEN_ERROR_MODAL, CLOSE_ERROR_MODAL} from "./actionTypes";

const initialStore = {
  isErrModalOpen: true
};

export default function reducer (store = initialStore, { type, payload }) {
  switch (type) {

    case OPEN_ERROR_MODAL:
      return { isErrModalOpen: payload } ;

    case CLOSE_ERROR_MODAL:
      return { isErrModalOpen: payload };

    default:
      return store

  }
}