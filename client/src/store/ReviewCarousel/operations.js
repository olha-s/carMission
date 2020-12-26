import { setReviews, ReviewsIsLoading, updateReviews } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";
import { getReviews } from "./selectors";

export const loadReviews = () => (dispatch) => {
  dispatch(ReviewsIsLoading(true));

  axios("/api/reviews/")
    .then((res) => {
      dispatch(setReviews(res.data));
      dispatch(ReviewsIsLoading(false));
    })
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });
};

export const filterReviews = (id) => (dispatch, getStore) => {
  const reviews = getReviews(getStore());

  const filtered = reviews.filter((review) => review._id !== id);
  dispatch(updateReviews(filtered));
};
