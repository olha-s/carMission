import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NavbarItem from "./NavbarItem.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore();
const store = mockStore({
    navbar: { 
        data: []
    },
    appMainSections: {
        sections: []
    }
});


test("Is NavbarItem HashLink have correct id", () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem id="test-id"/>
            </BrowserRouter>
        </Provider>
    )

    const link = getByTestId("navbarItemHashLink");
    expect(link.id).toBe("test-id");
})


test("Is NavbarItem HashLink have correct textContent", () => {   
    const { getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem textContent="some text"/>
            </BrowserRouter>
        </Provider>
    )

    getByText("some text");
})

test("Is NavbarItem HashLink have correct textContent", () => {   
    const { getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem isFooter contacts="contacts"/>
            </BrowserRouter>
        </Provider>
    )
    
    getByText("contacts");
})

test("Is NavbarItem HashLink have onClick, if navbar render on footer", () => {   
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));

    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem isFooter contacts="contacts"/>
            </BrowserRouter>
        </Provider>
    )
    
    const link = getByTestId("navbarItemHashLink");
    fireEvent.click(link);
})


