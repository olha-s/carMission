import { LOAD_LOGO, LOGO_LOADING } from "./actions";

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LOGO:
        return { ...state, ...action.payload }
    case LOGO_LOADING:
        return { ...state, isLoading: action.payload }
    default:
        return state
  }
}

export default reducer;
