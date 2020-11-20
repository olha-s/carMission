import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../generalComponents/Button/Button";
import "./ErrorModal.scss";

const ErrorModal = ({ error }) => {
  const [isErrorModal, setIsErrorModal] = useState(true);

  const closeErrorModal = (event) => {
    if (event.target === event.currentTarget) setIsErrorModal(!isErrorModal);
  };

  return (
    isErrorModal && (
      <div
        data-testid="git"
        className="error-modal"
        onClick={(event) => closeErrorModal(event)}
      >
        <div className="error-modal__window">
          <div className="error-modal__heading">
            <p className="error-modal__heading-text">{`an error ${error.name} occurred`}</p>
          </div>
          <p className="error-modal__text">{error.message}</p>
          <Button text="Ok" className="button-modal error-modal__btn" onClick={(event) => closeErrorModal(event)} />
        </div>
      </div>
    )
  );
};

ErrorModal.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorModal;
