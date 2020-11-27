import React from "react";

const WorkStageName = ({ stageName, classModifier }) => {
  return (
    <span className={`work-stages__item-name ${classModifier}`}>
      {stageName}
    </span>
  );
};

export default WorkStageName;
