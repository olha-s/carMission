import React from "react";
import Gear from "../SVG/Gear/Gear";
import WorkStageName from "../WorkStageName/WorkStageName";
import Arrow from "../SVG/Arrow/Arrow";
import Image from "../../Image/Image";
import PropTypes from "prop-types";

const WorkStageItem = ({ stageNum, stageName, stageLength, src }) => {
  return (
    <div
      className={`work-stages__item work-stages__slide work-stages__slide--${stageNum}`}
    >
      {stageNum % 2 === 0 && (
        <WorkStageName
          stageName={stageName}
          classModifier="work-stages__item-name--even"
        />
      )}
      <div className="work-stages__graphics-wrapper">
        <Gear />
        <Image src={src} alt="stage icon" className="work-stages__icon" />
        {stageNum < stageLength && (
          <Arrow className="work-stages__icon-arrow" />
        )}
        <span className="work-stages__stage-number">
          {stageNum < 10 ? `0${stageNum}` : stageNum}
        </span>
      </div>
      {stageNum % 2 !== 0 && (
        <WorkStageName
          stageName={stageName}
          classModifier="work-stages__item-name--odd"
        />
      )}
    </div>
  );
};

WorkStageItem.propTypes = {
  stageNum: PropTypes.number,
  stageName: PropTypes.string,
  stageLength: PropTypes.number,
  src: PropTypes.string,
};

export default WorkStageItem;
