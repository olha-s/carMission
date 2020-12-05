import { LOADING_REVIEWS, TOGGLE_IS_LOADING_REVIEWS } from "./actionTypes";

const initialState = {
    reviews: [],
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            }
        case TOGGLE_IS_LOADING_REVIEWS:
            return {
                ...state,
                isLoading: action.payload,
                // return [...state, action.payload];
            };
        default:
            return state;
    }
};

export default reducer;

