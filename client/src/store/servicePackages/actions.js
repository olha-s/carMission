import { LOADING_PACKAGES, TOGGLE_IS_LOADING_PACKAGES } from "./actionTypes";

export const setPackages = (packagesArr) => ({
  type: LOADING_PACKAGES,
  payload: packagesArr,
});

export const packagesIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_PACKAGES,
  payload: isLoading,
});
