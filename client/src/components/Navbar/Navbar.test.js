import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

const arr = [];
const className = "some-classname"

test("Navbar smoke test", () => {
    render(<Navbar items={arr} />);
});


// test("If props items is array", () => {
//     const { container } = render(<Navbar/>);

//     expect(container.firstChild).isDOMComponent("li");
// });