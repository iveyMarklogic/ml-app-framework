import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBox from './SearchBox'
const items = [
    {
        value: ['entity1', 'entity2'],
        label: 'All Entities'
    },
    {
        value: ['entity1'],
        label: 'Entity1'
    },
    {
        value: ['entity2'],
        label: 'Entity2'
    }
]

describe('SearchBox', () => {
    test('Check renders and Change value', () => {
        const { getAllByText } = render(<SearchBox ariaLabel="Search-label" placeholder="Search Placeholder" menuItems={items} />)
        const searchBoxElement = screen.getByLabelText('Search-label')
        const searchBoxDropdownElement = getAllByText('All Entities')[0]
        expect(searchBoxElement).toBeInTheDocument()
        expect(searchBoxDropdownElement).toBeInTheDocument()
        fireEvent.change(searchBoxElement, { target: { value: 'new text' } })
        expect(searchBoxElement).toHaveValue('new text')
    })
    test('Check onClick and onEnter was executed', () => {
        const mockFunction = jest.fn()
        const { getByTestId } = render(
            <SearchBox
                ariaLabel="Search-label"
                placeholder="Search Placeholder"
                onClick={mockFunction}
                onEnter={mockFunction}
                menuItems={items}
            />)
        const searchBoxElement = getByTestId('action-icon-container')
        fireEvent.click(searchBoxElement)
        expect(mockFunction).toHaveBeenCalledTimes(1)
        fireEvent.keyDown(searchBoxElement, { key: 'Enter', code: 'Enter' })
        expect(mockFunction).toHaveBeenCalledTimes(2)
    })
    test('Check entity menu ', () => {
        const mockOnSelect = jest.fn()
        const { getAllByText, getByText } = render(
            <SearchBox
                ariaLabel="Search-label"
                placeholder="Search Placeholder"
                onChangeMenu={mockOnSelect}
                menuItems={items}
            />)
        const searchBoxDropdownElement = getAllByText('All Entities')[0]
        fireEvent.click(searchBoxDropdownElement)
        const entityElement = getByText('Entity2')
        fireEvent.click(entityElement)
        expect(mockOnSelect).toHaveBeenCalledTimes(1)
        expect(getAllByText('Entity2')).toHaveLength(2)
    })
})
