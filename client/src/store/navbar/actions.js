import { LOAD_NAVBAR, NAVBAR_LOADING } from "./actionTypes";

export const setNavbarData = (data) => ({
  type: LOAD_NAVBAR,
  payload: data,
});

export const navbarDataLoading = (isLoading) => ({
  type: NAVBAR_LOADING,
  payload: isLoading,
});
