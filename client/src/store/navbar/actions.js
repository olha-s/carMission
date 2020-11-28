export const LOAD_NAVBAR = "LOAD_NAVBAR";
export const NAVBAR_LOADING = "NAVBAR_LOADING";

export const setNavbarData = (data) => ({
  type: LOAD_NAVBAR,
  payload: data,
});

export const navbarDataLoading = (isLoading) => ({
  type: NAVBAR_LOADING,
  payload: isLoading,
});
