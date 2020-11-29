import React from "react";
import { v4 as uuidv4 } from "uuid";

const ServicePackage = ({ className, name, price, currency, serviceList }) => {
  const servicesLiArr = serviceList.map((i) => <li key={uuidv4()}>{i}</li>);

  return (
    <div className={className}>
      <div className="servicePackages__item-title">
        <h3 className="servicePackages__name">{name}</h3>
        <span className="servicePackages__currency">{currency}</span>
        <span className="servicePackages__price">{price}</span>
      </div>
      <ul className="servicePackages__serviceList">{servicesLiArr}</ul>
    </div>
  );
};

export default ServicePackage;
