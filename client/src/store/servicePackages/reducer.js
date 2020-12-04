import { LOADING_PACKAGES, TOGGLE_IS_LOADING_PACKAGES } from "./actionTypes";

const initialState = {
  packages: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PACKAGES:
      return {
        ...state,
        packages: action.payload,
      };
    case TOGGLE_IS_LOADING_PACKAGES:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;