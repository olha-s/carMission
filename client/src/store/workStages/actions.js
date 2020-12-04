import { LOADING_STAGES, SET_IS_LOADING_STAGES } from "./actionTypes";

export const setStages = (newStages) => ({
  type: LOADING_STAGES,
  payload: newStages,
});

export const setStagesLoading = (isLoading) => ({
  type: SET_IS_LOADING_STAGES,
  payload: isLoading,
});
