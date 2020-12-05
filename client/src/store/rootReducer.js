import { combineReducers } from "redux";
import logo from "./logo/reducer";
import navbar from "./navbar/reducer";
import appMainSections from "./appMainSections/reducer";
import feedbackForm from "./FeedbackForm/reducer";
import aboutUs from "./aboutUs/reducer";
import servicePackages from "./servicePackages/reducer";
import paginationDotClick from "./paginationDotClick/reducer";
import workStages from "./workStages/reducer";
import reviewCarousel from "./ReviewCarousel/reduser";
import errModalReducer from "./ErrorModal/errModalReducer";
import errObjReducer from "./errorObject/errObjReducer";

const reducer = combineReducers({
  appMainSections,
  logo,
  navbar,
  feedbackForm,
  aboutUs,
  servicePackages,
  workStages,
  paginationDotClick,
  errModalReducer,
  errObjReducer,
  reviewCarousel,
});

export default reducer;
