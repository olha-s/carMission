import axios from "axios";
import { setNavbarData, navbarDataLoading, updateItem } from "./actions";
import { getNavbarData } from "./selectors";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";

export const loadNavbarData = () => async (dispatch) => {
  dispatch(navbarDataLoading(true));

  const navbarDataFromDB = await axios({
    method: "GET",
    url: "/api/navbar/",
  })
    .then((r) => r.data)
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

  const mainDataFromDB = await axios({
    method: "GET",
    url: "/api/sections-main/",
  })
    .then((r) => r.data)
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

    navbarDataFromDB.map(e => {
    if(e.sectionId) {
        const isDisabled = mainDataFromDB.find((i) => e.sectionId === i.name);
        if(isDisabled !== undefined) {
            e.disabled = isDisabled.disabled
        }
    }
    return e;
  })

  navbarDataFromDB.sort((a, b) => a.numberInNavbar - b.numberInNavbar);
  
  dispatch(setNavbarData(navbarDataFromDB));
  dispatch(navbarDataLoading(false));
};


export const filterNavbarData = (id) => (dispatch, getStore) => {
  const items = getNavbarData(getStore());
  const filtered = items.filter((item) => item._id !== id);
  dispatch(updateItem(filtered));
};

export const updateNavbarDataByNewObject = (newItem) => (dispatch, getStore) => {
  const items = getNavbarData(getStore());

  const updated = items.map((item) => {
    if (item._id === newItem._id) {
      return newItem;
    } else {
      return item;
    }
  });

  dispatch(updateItem(updated));
};

