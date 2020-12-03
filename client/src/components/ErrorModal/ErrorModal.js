import React from "react";
import Button from "../generalComponents/Button/Button";
import "./ErrorModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeErrModal } from "../../store/ErrorModal/closeErrModal";
import { isErrModalOpen } from "../../store/selectors/errModalSelectors";
import { errObjSelector } from "../../store/selectors/errObjSelector";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const ErrModalOpen = useSelector(isErrModalOpen);
  const err = useSelector(errObjSelector);

  return (
    ErrModalOpen &&
    err && (
      <div className="error-modal">
        <div className="error-modal__heading">
          <p className="error-modal__heading-text">{`${err.name}`}</p>
        </div>
        <p className="error-modal__text">{err.message}</p>
        <Button
          text="Ok"
          className="button-modal error-modal__btn"
          onClick={() => dispatch(closeErrModal)}
        />
      </div>
    )
  );
};

export default ErrorModal;
