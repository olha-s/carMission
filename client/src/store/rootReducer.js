import { combineReducers } from "redux";
import logo from "./logo/reducer";
import navbar from "./navbar/reducer";
import appMainSections from "./appMainSections/reducer";
import feedbackForm from "./FeedbackForm/reducer";
import aboutUs from "./aboutUs/reducer";
import errModalReducer from "./ErrorModal/errModalReducer";
import errObjReducer from "./errorObject/errObjReducer";

const reducer = combineReducers({
  appMainSections,
  logo,
  navbar,
  feedbackForm,
  aboutUs,
  errModalReducer,
  errObjReducer,
});

export default reducer;
