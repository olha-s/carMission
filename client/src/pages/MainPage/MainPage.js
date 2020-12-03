import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainSections } from "../../store/appMainSections/selectors";
import WorkStages from "../../sections/WorkStages/Main/WorkStages";
import AutoFromUsa from "../../sections/AutoFromUSA/AutoFromUsa";
import AboutUs from "../../sections/AboutUs/AboutUs";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";
import ServicePackages from "../../sections/ServicePackages/ServicePackages";
import { Helmet } from "react-helmet-async";
import { loadFeatures } from "../../store/aboutUs/operations";

const MainPage = () => {
  const sectionsFromDB = useSelector(getMainSections).filter(
    (section) => !section.disabled
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeatures());
  }, [dispatch]);

  const sectionsComponents = [
    WorkStages,
    AutoFromUsa,
    AboutUs,
    ReviewCarousel,
    ServicePackages,
  ];

  const mapComponentsToRender = () => {
    return sectionsFromDB.map((section) => {
      const { description, _id: id, heading, name, reactComponent } = section;
      const Component = sectionsComponents.find((component) => {
        if (component.type) {
          return component.type.name === reactComponent;
        }
        return component.name === reactComponent;
      });

      if (Component) {
        return (
          <Component
            description={description}
            heading={heading}
            anchorName={name}
            key={id}
          />
        );
      }
      return null;
    });
  };

  const filteredReadySections = mapComponentsToRender().filter(
    (i) => i !== null
  );

  return (
    <>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      {filteredReadySections}
    </>
  );
};

export default MainPage;
