import React from "react";
import { render } from "@testing-library/react";
import Logo from "./Logo";

test("Logo smoke test", () => {
  render(<Logo />);
});
