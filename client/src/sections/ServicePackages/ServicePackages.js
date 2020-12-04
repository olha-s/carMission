import React, { useEffect } from "react";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./servicePackages.scss";
import Button from "../../components/generalComponents/Button/Button";
import ServicePackage from "./components/ServicePackage";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";
import { pushHashToHistory } from "../../utils/functions/pushHashToHistory";
import {
  getDotClick,
  getTargetSection,
} from "../../store/paginationDotClick/selectors";
import {
  resetDotClick,
  resetTargetSection,
} from "../../store/paginationDotClick/actions";
import { getPackages } from "../../store/servicePackages/selectors";

const ServicePackages = ({ heading, anchorName, description }) => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ threshold: 0.3 });
  const history = useHistory();
  const dotTargetSection = useSelector(getTargetSection);
  const dotClick = useSelector(getDotClick);
  const servicePackages = useSelector(getPackages);

  useEffect(() => {
    if (inView) {
      if (dotTargetSection === anchorName && dotClick) {
        dispatch(resetTargetSection());
        dispatch(resetDotClick());
      } else if (!dotClick) {
        pushHashToHistory(history, anchorName);
      }
    }
  }, [inView, anchorName, history, dispatch, dotTargetSection, dotClick]);

  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };

  const servicePackagesToRender = servicePackages.map((servicePackage) => {
    const { price, currency, serviceList, name, _id: id } = servicePackage;
    return (
      <ServicePackage
        className="service-packages__item"
        name={name}
        price={price}
        currency={currency}
        serviceList={serviceList}
        key={id}
      />
    );
  });

  return (
    <section className="service-packages" id={anchorName} ref={ref}>
      <SectionHeading text={heading} />
      <div className="service-packages__wrapper">{servicePackagesToRender}</div>
      <p className="service-packages__description">{description}</p>
      <Button
        className="button2-send-request"
        text="Отправить заявку"
        onClick={showFeedbackModal}
      />
    </section>
  );
};

export default ServicePackages;
