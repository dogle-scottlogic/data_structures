import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from 'home'

describe('Home', () => {
    it('renders a heading', () => {
        const jsx = Home({ structures: ["test"] })
        render(jsx)
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
    })

    it('renders a list', () => {
        const jsx = Home({ structures: ["test"] })
        render(jsx)

        const listitem = screen.getByRole('listitem')
        expect(listitem).toBeInTheDocument()
        expect(listitem).toHaveTextContent("test")
    })
})
