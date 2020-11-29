import { combineReducers } from "redux";
import logo from "./logo/reducer";
import navbar from "./navbar/reducer";
import appMainSections from "./appMainSections/reducer";

const reducer = combineReducers({
  appMainSections,
  logo,
  navbar,
});

export default reducer;
