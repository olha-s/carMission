import React, { useState } from "react";
import Button from "../generalComponents/Button/Button";
import ModalDeleteConfirmation from "../admin/ModalDeleteConfirmation/ModalDeleteConfirmation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import AdminDropZone from "../admin/AdminDropZone/AdminDropZone";

const enhanceFormItem = (Component, config) => {
  return (props) => {
    const { routes, actions, dropZone, canBeDeleted, pathProp } = config;
    const { sourceObj, isNew } = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [fileReady, setFileReady] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteFromDB = async (e) => {
      e.preventDefault();

      const deleted = await axios
        .delete(`${routes.delete}${sourceObj._id}`)
        .catch((err) => {
          toastr.error(err.message);
        });

      if (deleted.status === 200) {
        toastr.success("Успешно", "Объект удалён в базе данных");
        dispatch(actions.filterDeleted(sourceObj._id));
      } else {
        toastr.warning("Хм...", "Что-то пошло не так");
      }
    };

    const handleDeleteNew = (e) => {
      e.preventDefault();
      setIsDeleted(true);
      toastr.success("Успешно", "Объект удалён до внесения в базу данных");
    };

    const uploadImgAndUpdateStore = async (values, id) => {
      const res = await axios
        .post(`${routes.upload}${id}`, fileReady, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((err) => {
          toastr.error(err.message);
        });

      dispatch(actions.updateS3Link(res.data.location, id));
      setFileReady(null);
      values[pathProp] = res.data.location;
      toastr.success("Успешно", "Изображение загружено");
    };

    const createPutRequest = (updatedObj) => {
      return axios
        .put(`${routes.put}${sourceObj._id}`, updatedObj)
        .catch((err) => {
          toastr.error(err.message);
        });
    };

    const createPostRequest = (values) => {
      return axios.post(routes.post, values).catch((err) => {
        toastr.error(err.message);
      });
    };

    const openConfirmModal = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    };

    if (isDeleted) {
      return null;
    }

    return (
      <Component
        put={createPutRequest}
        post={createPostRequest}
        uploadToS3={dropZone && uploadImgAndUpdateStore}
        file={dropZone && fileReady}
        {...props}
      >
        {dropZone && (
          <AdminDropZone
            imgURL={sourceObj[pathProp]}
            setFile={setFileReady}
            file={fileReady}
          />
        )}
        {canBeDeleted && (
          <>
            <Button
              className="admin-stages__delete-btn"
              text="&#10005;"
              onClick={openConfirmModal}
            />
            <ModalDeleteConfirmation
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              deleteHandler={isNew ? handleDeleteNew : handleDeleteFromDB}
            />
          </>
        )}
      </Component>
    );
  };
};

export default enhanceFormItem;
