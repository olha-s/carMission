import { LOADING_REVIEWS, TOGGLE_IS_LOADING_REVIEWS } from "./actionTypes";

export const setReviews = (reviewsArr) => ({
    type: LOADING_REVIEWS,
    payload: reviewsArr,
});

export const ReviewsIsLoading = (isLoading) => ({
    type: TOGGLE_IS_LOADING_REVIEWS,
    payload: isLoading,
});
