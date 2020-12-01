import React from "react";
import { useSelector } from "react-redux";
import { getMainSections } from "../../store/selectors/appMainSections";
import WorkStages from "../../components/WorkStages/Main/WorkStages";
import AutoFromUsa from "../../sections/AutoFromUSA/AutoFromUsa";
import AboutUs from "../../sections/AboutUs/AboutUs";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";
import ServicePackages from "../../sections/ServicePackages/ServicePackages";

const MainPage = () => {
  const sectionsFromDB = useSelector(getMainSections).filter(
    (section) => !section.disabled
  );
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

  return <div>{filteredReadySections}</div>;
};

export default MainPage;
