import { LOAD_SECTIONS, IS_LOADING_SECTIONS } from "./actions";

const initialState = {
  sections: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
    case IS_LOADING_SECTIONS:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
