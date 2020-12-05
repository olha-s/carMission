import {setReviews, ReviewsIsLoading} from "./actions";
import axios from "axios";
import {saveErrObjAction} from "../errorObject/saveErrObjAction";
import {openErrModal} from "../ErrorModal/openErrModalAction";

export const loadReviews = () => (dispatch) => {
    dispatch(ReviewsIsLoading(true));

    axios("/api/reviews/").then((res) => {
        dispatch(setReviews(res.data));
        dispatch(ReviewsIsLoading(false));
    })
     .catch((err) => {
        dispatch(saveErrObjAction(err));
        dispatch(openErrModal);
    });
};

