import React from "react";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./servicePackages.scss";
import Button from "../../components/generalComponents/Button/Button";
import ServicePackage from "./components/ServicePackage";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../../store/servicePackages/selectors";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";

const ServicePackages = ({ heading, anchorName, description }) => {
  const dispatch = useDispatch();
  const ref = useLiveHashPush(anchorName);
  const servicePackages = useSelector(getPackages);

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
