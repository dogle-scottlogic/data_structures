import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ControlPanel from 'components/controlPanel'

describe('ControlPanel', () => {
    it('renders two buttons', () => {
        const jsx = ControlPanel({ addNode: () => null, deleteNode: () => null })
        render(jsx)
        const buttonOne = screen.getByRole('button', { name: "Add" })
        expect(buttonOne).toBeInTheDocument()
        const buttonTwo = screen.getByRole('button', { name: "Delete" })
        expect(buttonTwo).toBeInTheDocument()
    })
})
