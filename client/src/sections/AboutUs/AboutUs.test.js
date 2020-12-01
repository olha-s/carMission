import React from "react";
import { render } from "@testing-library/react";
import AboutUs from "./AboutUs";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";

const mockHeadingText = "Test heading";
const mockSectionClassName = "about-us__container";

test("AboutUs is rendered correctly", () => {
  render(
    <AboutUs className={mockSectionClassName} heading={mockHeadingText} />
  );
});

test("AboutUs contains elements", () => {
  const { getByTestId } = render(
    <AboutUs className={mockSectionClassName} heading={mockHeadingText}>
      <SectionHeading className="about-us__heading" text={mockHeadingText} />
      <div className="about-us__container" />
    </AboutUs>
  );
  const headingText = getByTestId("section-heading");
  expect(headingText).toBeDefined();
});
