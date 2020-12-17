import { setStages, setStagesLoading, updateStages } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModal";
import { getWorkStages } from "./selectors";

export const loadWorkStages = () => async (dispatch) => {
  dispatch(setStagesLoading(true));

  const stagesFromDB = await axios({
    method: "GET",
    url: "/api/work-stages/",
  })
    .then((r) => r.data)
    .catch((err) => {
      dispatch(saveErrObjAction(err));
      dispatch(openErrModal);
    });

  stagesFromDB.sort((a, b) => a.num - b.num);

  dispatch(setStages(stagesFromDB));
  dispatch(setStagesLoading(false));
};

export const filterWorkStages = (id) => (dispatch, getStore) => {
  const stages = getWorkStages(getStore());

  const filtered = stages.filter((stage) => stage._id !== id);
  dispatch(updateStages(filtered));
};
