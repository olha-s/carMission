import { packagesIsLoading, setPackages } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";

export const loadPackages = () => async (dispatch) => {
  dispatch(packagesIsLoading(true));

  const servicePackagesFromServer = await axios({
    method: "GET",
    url: "/api/service-packages/",
  })
    .then((res) => res.data)
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

  dispatch(setPackages(servicePackagesFromServer));
  dispatch(packagesIsLoading(false));
};
