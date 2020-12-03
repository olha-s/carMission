import React, { memo, useEffect, useState } from "react";
import "./AboutUs.scss";
import axios from "axios";
import RegularFeature from "./components/RegularFeature/RegularFeature";
import MainFeature from "./components/MainFeature/MainFeature";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import { useDispatch, useSelector } from "react-redux";
import { saveErrObjAction } from "../../store/errorObject/saveErrObjAction";
import { openErrModal } from "../../store/ErrorModal/openErrModalAction";
import { errObjSelector } from "../../store/selectors/errObjSelector";

const AboutUs = ({ heading, anchorName }) => {
  const [featuresList, setFeaturesList] = useState([]);
  const dispatch = useDispatch();
  const errObj = useSelector(errObjSelector);

  useEffect(() => {
    const getFeatures = async () => {
      const featuresFromServer = await axios({
        method: "GET",
        url: "/api/features/",
      })
        .then((res) => res.data)
        .catch((err) => {
          dispatch(saveErrObjAction(err));
          dispatch(openErrModal);
        });
      setFeaturesList(featuresFromServer);
    };

    getFeatures();
  }, [dispatch]);

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
      {!errObj ? featuresRender(featuresList) : null}
    </section>
  );
};

export default memo(AboutUs);
