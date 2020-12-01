import React from "react";
import "./FeedbackForm.scss";
import {useSelector} from "react-redux";
import {feedbackFormOpen} from "../../../store/selectors/feedbackFormSelectors";
import FeedbackConfirmationWindow from "../FeedbackFormConfirmationWindow/FeedbackConfirmationWindow";
import FeedbackFormElement from "../FeedbackFormElement/FeedbackFormElement";


const FeedbackForm = () => {

    const isFeedbackFormOpen = useSelector(feedbackFormOpen);

    return (
        isFeedbackFormOpen === "open" ? <FeedbackFormElement/> : (isFeedbackFormOpen === "confirm") ?
            <FeedbackConfirmationWindow/> : null
    );
};

export default FeedbackForm;
