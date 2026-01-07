import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Description from 'components/description'

describe('Description', () => {
    it('renders a paragraph', () => {
        const jsx = Description({ children: <>test</> })
        render(jsx)
        const paragraph = screen.getByRole('paragraph')
        expect(paragraph).toBeInTheDocument()
    })
})
