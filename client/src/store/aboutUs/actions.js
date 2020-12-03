import { LOADING_FEATURES, TOGGLE_IS_LOADING_FEATURES } from "./actionTypes";

export const setFeatures = (featuresArr) => ({
  type: LOADING_FEATURES,
  payload: featuresArr,
});

export const featuresIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_FEATURES,
  payload: isLoading,
});
