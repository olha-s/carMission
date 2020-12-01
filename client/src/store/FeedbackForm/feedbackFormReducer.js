import { SHOW_FEEDBACK_FORM, HIDE_FEEDBACK_FORM, CONFIRM_FEEDBACK_FORM } from "./actionTypes";

const initialStore = {
  feedbackForm: { feedbackFormOpen: "closed" }
};

export default function reducer (store = initialStore, { type, payload }) {
  switch (type) {

    case SHOW_FEEDBACK_FORM:
      return { feedbackForm: payload } ;

    case HIDE_FEEDBACK_FORM:
      return { feedbackForm: payload };

    case CONFIRM_FEEDBACK_FORM:
      return { feedbackForm: payload };

    default:
      return store

  }
}