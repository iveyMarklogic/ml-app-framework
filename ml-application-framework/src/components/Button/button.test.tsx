import React from 'react'
import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
    test('renders the Button component', () => {
        render(<Button label="Click me!" />)
        const buttonElement = screen.getByText('Click me!')
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveTextContent('Click me!')
    })
})
