import { LOAD_LOGO, LOGO_LOADING } from "./actionTypes";

export const setLogoData = (data) => ({
  type: LOAD_LOGO,
  payload: data,
});

export const logoDataLoading = (isLoading) => ({
  type: LOGO_LOADING,
  payload: isLoading,
});
