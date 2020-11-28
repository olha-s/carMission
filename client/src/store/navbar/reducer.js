import { LOAD_NAVBAR, NAVBAR_LOADING } from "./actions";

const initialState = {
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NAVBAR:
      return { ...state, data: action.payload };
    case NAVBAR_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
