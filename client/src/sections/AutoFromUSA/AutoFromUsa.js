import React from "react";
import "./AutoFromUSA.scss";
import Button from "../../components/generalComponents/Button/Button";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import SocialNetworks from "../../components/SocialNetworks/SocialNetworks";

const AutoFromUsa = ({ heading, description, anchorName }) => {
  const dispatch = useDispatch();
  return (
    <section className="auto-from-usa__container" id={anchorName}>
      <div className="auto-from-usa__wrapper">
        <h1 className="auto-from-usa__heading">{heading}</h1>
        <SocialNetworks className="header__networks" />
        <p className="auto-from-usa__description">{description}</p>
        <Button
          className="button-choose-car"
          text="Подобрать авто"
          onClick={() => {
            dispatch(showFeedbackFormAction);
          }}
        />
      </div>
    </section>
  );
};
export default AutoFromUsa;
