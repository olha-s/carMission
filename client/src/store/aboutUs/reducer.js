import { LOADING_FEATURES, TOGGLE_IS_LOADING_FEATURES } from "./actionTypes";

const initialState = {
  features: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FEATURES:
      return {
        ...state,
        features: action.payload,
      };
    case TOGGLE_IS_LOADING_FEATURES:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
