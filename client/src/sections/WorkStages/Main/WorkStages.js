import React from "react";
import "./WorkStages.scss";
import WorkStagesList from "../WorkStagesList/WorkStagesList";
import Button from "../../../components/generalComponents/Button/Button";
import SectionHeading from "../../../components/generalComponents/SectionHeading/SectionHeading";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";


const WorkStages = ({ description, heading, anchorName }) => {
  const dispatch = useDispatch();

  return (
    <section id={anchorName} className="work-stages">
      <div className="work-stages__content">
        <SectionHeading text={heading} />
        <div className="work-stages__items-wrapper">
          <WorkStagesList />
        </div>
        <p className="work-stages__description">{description}</p>
        <Button text="Обратный звонок" className="button-callback-bigger" onClick={() => dispatch()} />
      </div>
    </section>
  );
};

WorkStages.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string,
};

export default WorkStages;
