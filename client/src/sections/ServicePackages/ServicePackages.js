import React from "react";
import PropTypes from "prop-types";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./servicePackages.scss";
import Button from "../../components/generalComponents/Button/Button";


const ServicePackages = ({name, price, currency, serviceList}) => {

  return (
    <div className="servicePackages">
      <SectionHeading text="Пакеты услуг"/>
      <div className="servicePackages__wrapper">
        <div className="servicePackages__item">
          <div className="servicePackages__item-title">
            <h3 className="servicePackages__name">Light{name}</h3>
            <span className="servicePackages__currency">${currency}</span>
            <span className="servicePackages__price">300{price}</span>
          </div>
          <ul className="servicePackages__serviceList">
            <li>Подбор авто на аукционе</li>
            <li>Участие в аукционе</li>
            <li>Доставка авто в Одессу</li>
            <li>Таможенное оформление</li>
            <li>Доставка авто в Киев</li>
            <li>Сертификация</li>
          </ul>
        </div>
        <div className="servicePackages__item">
          <div className="servicePackages__item-title">
            <h3 className="servicePackages__name">Medium{name}</h3>
            <span className="servicePackages__currency">${currency}</span>
            <span className="servicePackages__price">600{price}</span>
          </div>
          <ul className="servicePackages__serviceList">
            <li>Подбор авто на аукционе</li>
            <li>Участие в аукционе</li>
            <li>Доставка авто в Одессу</li>
            <li>Таможенное оформление</li>
            <li>Доставка авто в Киев</li>
            <li>Сертификация</li>
            <li>Полировка и химчистка авто</li>
          </ul>
        </div>
        <div className="servicePackages__item">
          <div className="servicePackages__item-title">
            <h3 className="servicePackages__name">Premium{name}</h3>
            <span className="servicePackages__currency">${currency}</span>
            <span className="servicePackages__price">1000{price}</span>
          </div>
          <ul className="servicePackages__serviceList">
            <li>Подбор авто на аукционе</li>
            <li>Участие в аукционе</li>
            <li>Доставка авто в Одессу</li>
            <li>Таможенное оформление</li>
            <li>Доставка авто в Киев</li>
            <li>Сертификация</li>
            <li>Полировка и химчистка авто</li>
          </ul>
        </div>
      </div>
      <p className="servicePackages__description">
        Оставьте заявку и мы поможем вам выбрать подходящий для вас пакет услуг
      </p>
      <Button className="button2-sendRequest" text="Отправить заявку"/>
    </div>
  );
};

ServicePackages.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number,
  serviceList: PropTypes.array.isRequired
};
export default ServicePackages;
