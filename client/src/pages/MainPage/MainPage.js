import React from "react";
import AutoFromUsa from "../../sections/AutoFromUSA/AutoFromUSA";
import AboutUs from "../../sections/AboutUs/AboutUs";
import ServicePackages from "../../sections/ServicePackages/ServicePackages";


const MainPage = () => {
  return (
    <div>
      <AutoFromUsa />
      <AboutUs />
      <ServicePackages/>
    </div>
  );
};

export default MainPage;
