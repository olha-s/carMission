import React, { memo } from "react";
import "./AboutUs.scss";
import RegularFeature from "./components/RegularFeature/RegularFeature";
import MainFeature from "./components/MainFeature/MainFeature";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import { useSelector } from "react-redux";
import {
  getFeatures,
  getFeaturesIsLoading,
} from "../../store/aboutUs/selectors";
import Loader from "../../components/Loader/Loader";

const AboutUs = ({ heading, anchorName }) => {
  const featuresList = useSelector(getFeatures);
  const isLoading = useSelector(getFeaturesIsLoading);

  const featuresRender = () => {
    const regularFeaturesArr = featuresList.filter((f) => !f.isMain);
    const mainFeatureArr = featuresList.filter((f) => f.isMain);

    const regularFeaturesToRender = regularFeaturesArr.map((regularFeature) => {
      const { imgPath, title, _id: id } = regularFeature;
      return (
        <RegularFeature
          className="about-us__feature-box"
          imgPath={imgPath}
          title={title}
          key={id}
        />
      );
    });

    const mainFeatureToRender = mainFeatureArr.map((mainFeature) => {
      const { imgPath, title, text, _id: id } = mainFeature;
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
      <>
        <div className="about-us__features-box">{regularFeaturesToRender}</div>
        {mainFeatureToRender}
      </>
    );
  };

  return (
    <section className="about-us__container" id={anchorName}>
      <SectionHeading className="about-us__heading" text={heading} />
      {isLoading ? <Loader /> : featuresRender(featuresList)}
    </section>
  );
};

export default memo(AboutUs);
