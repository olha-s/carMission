import React from "react";
import "./WorkStages.scss";
import WorkStagesList from "../WorkStagesList/WorkStagesList";
import Button from "../../generalComponents/Button/Button";
import SectionHeading from "../../generalComponents/SectionHeading/SectionHeading";

const WorkStages = () => {
  return (
    <section className="work-stages">
      <div className="work-stages__content">
        <SectionHeading text="Этапы Сотрудничества" />
        <div className="work-stages__items-wrapper">
          <WorkStagesList />
        </div>
        <p className="work-stages__description">
          Сделайте первый шаг для выбора лучшей машины, свяжитесь с нами прямо
          сейчас
        </p>
        <Button text="Обратный звонок" className="button-callBack-bigger" />
      </div>
    </section>
  );
};

export default WorkStages;
