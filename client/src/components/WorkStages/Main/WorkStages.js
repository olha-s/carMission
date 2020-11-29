import React from "react";
import "./WorkStages.scss";
import WorkStagesList from "../WorkStagesList/WorkStagesList";
import Button from "../../generalComponents/Button/Button";
import SectionHeading from "../../generalComponents/SectionHeading/SectionHeading";
import PropTypes from "prop-types";

const WorkStages = ({ description, heading, anchorName }) => {
  return (
    <section id={anchorName} className="work-stages">
      <div className="work-stages__content">
        <SectionHeading text={heading} />
        <div className="work-stages__items-wrapper">
          <WorkStagesList />
        </div>
        <p className="work-stages__description">{description}</p>
        <Button text="Обратный звонок" className="button-callBack-bigger" />
      </div>
    </section>
  );
};

WorkStages.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string
};

export default WorkStages;
