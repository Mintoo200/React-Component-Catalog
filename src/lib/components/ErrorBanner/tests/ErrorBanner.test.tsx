import React from 'react'
import { render, screen } from '@testing-library/react'
import Banner from '../ErrorBanner'

describe('Error Banner tests', (): void => {
  it('should render the message when provided', (): void => {
    const message = 'This is a message'
    render(<Banner message={message} />)
    expect(screen.getByRole('dialog')).toHaveTextContent(message)
  })
  it('should render the children when provided', (): void => {
    render(<Banner><div data-testid="child" /></Banner>)
    const dialog = screen.getByRole('dialog')
    const child = screen.getByTestId('child')
    expect(dialog).toContainElement(child)
  })
})
