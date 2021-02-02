import React from "react";
import Button from "../../generalComponents/Button/Button";
import "./ModalDeleteConfirmation.scss";

const ModalDeleteConfirmation = ({ isOpen, setIsOpen, deleteHandler }) => {
  const closeModal = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h3 className="modal-head-text">Подтверждение</h3>
            <Button
              text="&#215;"
              className="modal__close-btn"
              onClick={closeModal}
            />
          </div>
          <div className="modal__content">
            <p className="modal__content-text">
              Вы действительно хотите удалить этот объект?
            </p>
          </div>
          <div className="modal__btn-wrapper">
            <Button
              text="Да"
              className="modal__btn yes-btn"
              onClick={deleteHandler}
            />
            <Button
              text="Нет"
              className="modal__btn no-btn"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ModalDeleteConfirmation;
