import { LOAD_LOGO } from "./actions";

const initialState = {
    data: {
        path: "/img/logo/main-logo.png",
        id: "main-logo",
        alt: "main-logo"
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LOGO:
        return { ...state, data: action.payload }
    default:
        return state
  }
}

export default reducer;

