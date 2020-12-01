import React, { memo, useEffect, useState } from "react";
import "./AboutUs.scss";
import axios from "axios";
import RegularFeature from "./components/RegularFeature/RegularFeature";
import MainFeature from "./components/MainFeature/MainFeature";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";

const AboutUs = ({ heading, anchorName }) => {
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    getFeatures();
  }, []);

  const getFeatures = async () => {
    const featuresFromServer = await axios("/api/features/").then(
      (res) => res.data
    );
    setFeaturesList(featuresFromServer);
  };

  const regFeaturesArr = featuresList.filter(
    (feature) => feature.isMain === false
  );
  const regularFeaturesToRender = regFeaturesArr.map((rf) => {
    const { imgPath, title, _id: id } = rf;
    return (
      <RegularFeature
        className="about-us__feature-box"
        imgPath={imgPath}
        title={title}
        key={id}
      />
    );
  });

  const mainFeatureArr = featuresList.filter(
    (feature) => feature.isMain === true
  );
  const mainFeatureToRender = mainFeatureArr.map((mf) => {
    const { imgPath, title, text, _id: id } = mf;
    return (
      <MainFeature
        className="about-us__main-feature-box"
        imgPath={imgPath}
        title={title}
        text={text}
        key={id}
      />
    );
  });

  return (
    <section className="about-us__container" id={anchorName}>
      <SectionHeading className="about-us__heading" text={heading} />

      <div className="about-us__features-box">
        <div className="about-us__features-sub-box">
          {regularFeaturesToRender[0]}
          {regularFeaturesToRender[1]}
        </div>
        <div className="about-us__features-sub-box">
          {regularFeaturesToRender[2]}
          {regularFeaturesToRender[3]}
        </div>
      </div>

      {mainFeatureToRender}
    </section>
  );
};

export default memo(AboutUs);
