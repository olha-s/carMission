import React from "react";
import { shallow, configure } from "enzyme";
import { render } from "@testing-library/react";
import ErrorModal from "./ErrorModal";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ErrorModal component", () => {
  const error = {
    name: "test error",
    message: "test error message",
  };

  test("should be rendered", () => {
    render(<ErrorModal error={error} />);
  });

  test("should be rendered according to props fulfilled", () => {
    const container = shallow(<ErrorModal error={error} />);
    expect(container.hasClass("error-modal")).toBeTruthy();
    expect(container.find(".error-modal__heading-text").text()).toBe(
      `an error ${error.name} occurred`
    );
    expect(container.find(".error-modal__text").text()).toBe(
      "test error message"
    );
  });
});
