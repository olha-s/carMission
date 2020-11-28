import axios from "axios";
import { setNavbarData, navbarDataLoading } from "./actions";

export const loadNavbarData = () => (dispatch) => {
  dispatch(navbarDataLoading(true));
  axios("/api/navbar").then((res) => {
    dispatch(setNavbarData(res.data));
    dispatch(navbarDataLoading(false));
  });
};
