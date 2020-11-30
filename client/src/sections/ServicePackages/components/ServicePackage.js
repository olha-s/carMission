import React from "react";
import "./ServicePackage.scss";
import { v4 as uuidv4 } from "uuid";

const ServicePackage = ({ name, price, currency, serviceList }) => {
  const servicesLiArr = serviceList.map((i) => <li key={uuidv4()}>{i}</li>);

  return (
    <div className="service-item">
      <div className="service-item__title">
        <h3 className="service-item__name">{name}</h3>
        <span className="service-item__currency">{currency}</span>
        <span className="service-item__price">{price}</span>
      </div>
      <ul className="service-item__serviceList">{servicesLiArr}</ul>
    </div>
  );
};

export default ServicePackage;
