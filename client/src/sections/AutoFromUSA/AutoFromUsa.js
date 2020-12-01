import React, { useEffect, useState } from "react";
import "./AutoFromUSA.scss";
import Button from "../../components/generalComponents/Button/Button";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { showFeedbackFormAction } from "../../store/FeedbackForm/showFeedbackFormAction";

const AutoFromUsa = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imgPath, setImgPath] = useState("");

  // const dispatch = useDispatch();
  // const showForm = () => {
  //   dispatch(showFeedbackFormAction);
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataFromServer = await axios("/api/sections-main/").then((res) => {
      return res.data.filter((d) => d.index === 1);
    });
    setHeading(dataFromServer[0].heading);
    setDescription(dataFromServer[0].description);
    setImgPath(dataFromServer[0].imgPath);
  };

  return (
    <section
      className="auto-from-usa__container"
    >
      <div className="auto-from-usa__wrapper">
        <h1 className="auto-from-usa__heading">{heading}</h1>
        <p className="auto-from-usa__description">{description}</p>
        <Button
          className="button-choose-car"
          text="Подобрать авто"
          onClick={() => {}}
        />
      </div>
    </section>
  );
};

export default AutoFromUsa;
