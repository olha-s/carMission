import { featuresIsLoading, setFeatures } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModalAction";

export const loadFeatures = () => async (dispatch) => {
  dispatch(featuresIsLoading(true));

  const featuresFromServer = await axios({
    method: "GET",
    url: "/api/features/",
  })
    .then((res) => res.data)
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

  dispatch(setFeatures(featuresFromServer));
  dispatch(featuresIsLoading(false));
};
