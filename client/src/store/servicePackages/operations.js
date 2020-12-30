import { packagesIsLoading, setPackages, updatePackages } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";
import { getPackages } from "./selectors";

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

export const filterServicePackages = (id) => (dispatch, getStore) => {
  const packages = getPackages(getStore());

  const filtered = packages.filter(
    (servicePackage) => servicePackage.id === id
  );
  dispatch(updatePackages(filtered));
};
