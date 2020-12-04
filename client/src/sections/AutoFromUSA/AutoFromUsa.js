import React, { useEffect } from "react";
import "./AutoFromUSA.scss";
import Button from "../../components/generalComponents/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import SocialNetworks from "../../components/SocialNetworks/SocialNetworks";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";
import { pushHashToHistory } from "../../utils/functions/pushHashToHistory";
import {
  resetDotClick,
  resetTargetSection,
} from "../../store/paginationDotClick/actions";
import {
  getDotClick,
  getTargetSection,
} from "../../store/paginationDotClick/selectors";

const AutoFromUsa = ({ heading, description, anchorName }) => {
  const dispatch = useDispatch();

  const { ref, inView } = useInView({ threshold: 0.6 });
  const history = useHistory();
  const dotTargetSection = useSelector(getTargetSection);
  const dotClick = useSelector(getDotClick);

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

  return (
    <section className="auto-from-usa__container" id={anchorName} ref={ref}>
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
