import { combineReducers } from "redux";
import logo from "./logo/reducer";
import navbar from "./navbar/reducer";
import appMainSections from "./appMainSections/reducer";
import feedbackFormReducer from "./FeedbackForm/feedbackFormReducer";

const reducer = combineReducers({
  appMainSections,
  logo,
  navbar,
  feedbackFormReducer
});

export default reducer;
