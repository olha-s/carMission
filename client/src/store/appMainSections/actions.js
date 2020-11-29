export const LOAD_SECTIONS = "LOAD_SECTIONS";
export const IS_LOADING_SECTIONS = "IS_LOADING_SECTIONS";

export const setMainSections = (sectionsArr) => ({
  type: LOAD_SECTIONS,
  payload: sectionsArr,
});

export const setIsLoading = (isLoading) => ({
  type: IS_LOADING_SECTIONS,
  payload: isLoading,
});
