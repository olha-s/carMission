import React, { useState, useEffect } from "react";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./servicePackages.scss";
import Button from "../../components/generalComponents/Button/Button";
import axios from "axios";
import ServicePackage from "./components/ServicePackage";

const ServicePackages = ({ heading, anchorName, description }) => {
  const [servicePackages, setServicePackages] = useState([]);

  useEffect(() => {
    getServicePackages();
  }, []);

  const getServicePackages = async () => {
    const servicePackagesFromServer = await axios(
      "/api/service-packages/"
    ).then((res) => res.data);
    setServicePackages(servicePackagesFromServer);
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
    <section className="service-packages" id={anchorName}>
      <SectionHeading text={heading} />
      <div className="service-packages__wrapper">{servicePackagesToRender}</div>
      <p className="service-packages__description">{description}</p>
      <Button className="button2-sendRequest" text="Отправить заявку" />
    </section>
  );
};

export default ServicePackages;