import React from "react";
import WorkStageItem from "../WorkStageItem/WorkStageItem";
import Loader from "../../../components/Loader/Loader";
import { useSelector } from "react-redux";
import {
  getWorkStages,
  getWorkStagesLoading,
} from "../../../store/workStages/selectors";

const WorkStagesList = () => {
  const stagesFromDB = useSelector(getWorkStages);
  const isLoading = useSelector(getWorkStagesLoading);

  const listToRender = stagesFromDB.map((stage) => {
    const { num, name, _id: id, iconSrc } = stage;

    return (
      <WorkStageItem
        stageName={name}
        stageNum={num}
        stageLength={stagesFromDB.length}
        src={iconSrc}
        key={id}
      />
    );
  });

  return isLoading || !listToRender.length ? (
    <Loader className="work-stages__loader" />
  ) : (
    <>{listToRender}</>
  );
};

export default WorkStagesList;
