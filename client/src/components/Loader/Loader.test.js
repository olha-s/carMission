import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

test("Loader have default class-name", () => {
  const { getByTestId } = render(<Loader />);
  const loade = getByTestId("loader");
  expect(loade.className).toBe("loader-window");
});

test("Loader have correct class-name", () => {
  const { getByTestId } = render(<Loader className="test-loader" />);
  const loade = getByTestId("loader");
  expect(loade.className).toBe("test-loader");
});
