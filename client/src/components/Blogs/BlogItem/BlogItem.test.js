import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BlogItem from "./BlogItem";

const mockSrc = "src";
const mockTitle = "title";
const mockText = "some blog text";
const mockButtonText = "buttonText";
const mockDate = "date";
const btnClickMock = jest.fn();

test("BlogItem is rendered is correctly", () => {
  render(
    <BlogItem
      src={mockSrc}
      title={mockTitle}
      text={mockText}
      buttonText={mockButtonText}
      date={mockDate}
      onClick={btnClickMock}
    />
  );
});

test("BlogItem contains text", () => {
  const { getByTestId, getByText } = render(
    <BlogItem
      src={mockSrc}
      title={mockTitle}
      text={mockText}
      buttonText={mockButtonText}
      date={mockDate}
      onClick={btnClickMock}
    />
  );
  const blogText = getByTestId("blog-item__text");

  expect(getByText("some blog text")).toBeInTheDocument();
  expect(blogText).toBeDefined();
});

test("Function onClick is called when was clicked on button", () => {
 const { getByTestId } = render(
   <BlogItem
     src={mockSrc}
     title={mockTitle}
     text={mockText}
     buttonText={mockButtonText}
     date={mockDate}
     onClick={btnClickMock}
   />
  );
  const btn = getByTestId("btn");
  expect(btnClickMock).not.toHaveBeenCalled();
  fireEvent.click(btn);
  expect(btnClickMock).toHaveBeenCalledTimes(1);
});

