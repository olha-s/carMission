import { combineReducers } from "redux";
import logo from "./logo/reducer";
import navbar from "./navbar/reducer";

const reducer = combineReducers({
  logo,
  navbar,
});

export default reducer;
