import React, { useEffect, useState } from "react";
import "./AutoFromUSA.scss";
import Button from "../../components/generalComponents/Button/Button";
import axios from "axios";

const AutoFromUsa = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imgPath, setImgPath] = useState("");

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
    <div
      className="auto-from-usa__container"
      style={{ backgroundImage: `url("${imgPath}")` }}
    >
      <div className="auto-from-usa__wrapper">
        <h1 className="auto-from-usa__heading">{heading}</h1>
        <p className="auto-from-usa__sub-heading">{description}</p>
        <Button
          className="button-chooseCar"
          text="Подобрать авто"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AutoFromUsa;
