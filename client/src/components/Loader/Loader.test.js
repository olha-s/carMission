import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Unit testing Loader", () => {
  test("smoke test Loader", () => {
    render(<Loader />);
  });
});
