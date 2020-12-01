import React from "react";
import { render } from "@testing-library/react";
import AutoFromUsa from "./AutoFromUsa";
import Button from "../../components/generalComponents/Button/Button";

const mockHeadingText = "Test heading";
const mockSectionClassName = "auto-from-usa__container";
const mockSectionDescription = "Test description";

test("AutoFromUsa is rendered correctly", () => {
  render(
    <AutoFromUsa className={mockSectionClassName} heading={mockHeadingText} />
  );
});

test("AutoFromUsa contains elements", () => {
  const { getByTestId } = render(
    <AutoFromUsa className={mockSectionClassName} heading={mockHeadingText}>
      <div className="auto-from-usa__wrapper">
        <h1 className="auto-from-usa__heading">{mockHeadingText}</h1>
        <p className="auto-from-usa__description">{mockSectionDescription}</p>
        <Button text="testBtn" />
      </div>
    </AutoFromUsa>
  );
  const btnText = getByTestId("btn");
  expect(btnText).toBeDefined();
});
