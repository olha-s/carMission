import { HIDE_FEEDBACK_FORM } from "./actionTypes";

export const hideFeedbackFormAction = {
  type: HIDE_FEEDBACK_FORM,
  payload: {
    feedbackForm: "closed",
  },
};
