import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("app render", () => {
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(container.firstChild).toHaveClass("App");
});
