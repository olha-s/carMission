import { setStages, setStagesLoading } from "./actions";
import axios from "axios";
import { saveErrObjAction } from "../errorObject/saveErrObjAction";
import { openErrModal } from "../ErrorModal/openErrModalAction";

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
