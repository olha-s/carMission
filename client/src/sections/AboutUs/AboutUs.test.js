import React from "react";
import { render } from "@testing-library/react";
import AboutUs from "./AboutUs";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";

test("AboutUs is rendered correctly", () => {
  const mockSectionClassName = "about-us__container";
  render(<AboutUs className={mockSectionClassName} />);
});

test("AboutUs contains sections", () => {
  const mockHeadingText = "Test heading";
  const mockFeatureClassName = "about-us__container";
  const { getByTestId } = render(
    <AboutUs>
      <SectionHeading text={mockHeadingText} />
      <div className={mockFeatureClassName} />
    </AboutUs>
  );
  const headingText = getByTestId("section-heading");
  expect(headingText).toBeDefined();
});
