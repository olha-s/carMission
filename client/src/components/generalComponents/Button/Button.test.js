import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

test("Function onClick is called when was clicked on button", () => {
    const btnClickMock = jest.fn();
    const mockText = "text";
    const { getByTestId } = render(<Button text = {mockText} onClick={btnClickMock} />);

    const btn = getByTestId("btn");
    expect(btnClickMock).not.toHaveBeenCalled();
    fireEvent.click(btn);
    expect(btnClickMock).toHaveBeenCalledTimes(1);
});