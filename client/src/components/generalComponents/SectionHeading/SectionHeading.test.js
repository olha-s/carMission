import React from "react";
import { render } from "@testing-library/react";
import SectionHeading from "./SectionHeading";

const mockText = "Title";

test("SectionHeading is rendered is correctly", () => {
  render(<SectionHeading text={mockText} />);
});
// test("Simple SectionHeading snapshot", () => {
//   const { container } = render(<SectionHeading text={mockText} />);
//   expect(container.innerHTML).toMatchInlineSnapshot(
//     `"<h2 data-testid=\\"section-heading\\" class=\\"section__heading\\">Title</h2>"`
//   );
// });

test("SectionHeading contains text", () => {
  const { getByTestId, getByText } = render(<SectionHeading text={mockText} />);
  const title = getByTestId("section-heading");

  expect(getByText("Title")).toBeInTheDocument();
  expect(title).toBeDefined();
});
