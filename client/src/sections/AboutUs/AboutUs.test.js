import React from "react";
import { render } from "@testing-library/react";
import AboutUs from "./AboutUs";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockHeadingText = "Test heading";
const mockSectionClassName = "about-us__container";
const mockId = "testId";

const mockStore = configureStore();
const store = mockStore({
  errObjReducer: { err: { message: "testError" } },
  errModalReducer: { isErrModalOpen: false },
});

test("AboutUs is rendered correctly", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
  }));

  render(
    <Provider store={store}>
      <AboutUs
        className={mockSectionClassName}
        heading={mockHeadingText}
        anchorName={mockId}
      />
    </Provider>
  );
});

test("AboutUs contains elements", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <AboutUs className={mockSectionClassName} heading={mockHeadingText}>
        <SectionHeading className="about-us__heading" text={mockHeadingText} />
        <div className="about-us__container" />
      </AboutUs>
    </Provider>
  );
  const headingText = getByTestId("section-heading");
  expect(headingText).toBeDefined();
});
