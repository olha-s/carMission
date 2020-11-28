export const LOAD_LOGO = "LOAD_LOGO";
export const LOGO_LOADING = "LOGO_LOADING";

export const setLogoData = (data) => ({
  type: LOAD_LOGO,
  payload: data,
});

export const logoDataLoading = (isLoading) => ({
  type: LOGO_LOADING,
  payload: isLoading,
});
