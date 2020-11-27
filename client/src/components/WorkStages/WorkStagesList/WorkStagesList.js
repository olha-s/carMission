import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkStageItem from "../WorkStageItem/WorkStageItem";
import Loader from "../../Loader/Loader";

const WorkStagesList = () => {
  const [workStagesList, setWorkStagesList] = useState([]);

  useEffect(() => {
    getWorkStages();
  }, []);

  const getWorkStages = async () => {
    const stagesFromServer = await axios("/api/work-stages/").then(
      (r) => r.data
    );

    setWorkStagesList(stagesFromServer);
  };

  const listToRender = workStagesList.map((stage) => {
    const { num, name, _id: id, iconSrc } = stage;

    return (
      <WorkStageItem
        stageName={name}
        stageNum={num}
        stageLength={workStagesList.length}
        src={iconSrc}
        key={id}
      />
    );
  });

  if (!workStagesList.length) {
    return <Loader />;
  }

  return <>{listToRender}</>;
};

export default WorkStagesList;
