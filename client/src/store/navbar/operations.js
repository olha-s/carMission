import axios from "axios";
import { setNavbarData, navbarDataLoading, updateItem } from "./actions";
import { getNavbarData } from "./selectors";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";

export const loadNavbarData = () => (dispatch) => {
  dispatch(navbarDataLoading(true));
  axios("/api/navbar").then((res) => {
    dispatch(setNavbarData(res.data));
  })
  .catch((err) => {
    dispatch(saveErrObjAction(err));
    dispatch(openErrModal);
  });
  dispatch(navbarDataLoading(false));
};


export const filterNavbarData = (id) => (dispatch, getStore) => {
  const items = getNavbarData(getStore());
  const filtered = items.filter((item) => item._id !== id);
  dispatch(updateItem(filtered));
};
