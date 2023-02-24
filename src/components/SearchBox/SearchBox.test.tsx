import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
    test("Check renders and Change value", () => {
        render(<SearchBox ariaLabel="Search-label" placeholder="Search Placeholder" />);
        const searchBoxElement = screen.getByLabelText("Search-label");
        expect(searchBoxElement).toBeInTheDocument();
        fireEvent.change(searchBoxElement, {target: {value: 'new text'}});
        expect(searchBoxElement).toHaveValue('new text');
    });
    test("Check onClick and onEnter was executed", () => {
        const mockFuntion = jest.fn();
        const {getByTestId} = render(<SearchBox ariaLabel="Search-label" placeholder="Search Placeholder" onClick={mockFuntion} onEnter={mockFuntion} />);
        const searchBoxElement = getByTestId("action-icon-container");
        fireEvent.click(searchBoxElement);
        expect(mockFuntion).toHaveBeenCalledTimes(1);
        fireEvent.keyDown(searchBoxElement, {key: 'Enter', code: 'Enter'});
        expect(mockFuntion).toHaveBeenCalledTimes(2);
    });
});