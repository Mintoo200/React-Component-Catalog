import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import Modal from '../Modal'
import ModalTitle from '../ModalTitle'

describe('Modal tests', () => {
  it('should close when pressing Escape', () => {
    const onClose = jest.fn()
    render(
      <Modal isOpen onClose={onClose}>
        <div />
      </Modal>,
    )
    userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('should close when clicking the close button', () => {
    const onClose = jest.fn()
    render(
      <Modal isOpen onClose={onClose}>
        <ModalTitle>Hello</ModalTitle>
      </Modal>,
    )
    const close = screen.getByText('x')
    userEvent.click(close)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('should trap the focus', () => {
    render(
      <>
        <Modal isOpen onClose={() => null}>
          <button type="button">inside</button>
        </Modal>
        <button type="button">outside</button>
      </>,
    )
    const inside = screen.getByText('inside')
    const outside = screen.getByText('outside')
    inside.focus()
    userEvent.tab()
    expect(outside).not.toHaveFocus()
  })
  it('should return the focus to the last item focussed on close', () => {
    function Component(): React.ReactElement {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)} type="button">open</button>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <button type="button">focus</button>
          </Modal>
        </>
      )
    }
    render(
      <Component />,
    )
    const openButton = screen.getByText('open')
    const focusButton = screen.getByText('focus')
    userEvent.click(openButton)
    expect(openButton).toHaveFocus()
    focusButton.focus()
    act(() => { userEvent.keyboard('{Escape}') })
    expect(openButton).toHaveFocus()
  })
  it('should close when clicking outside', () => {
    const onClose = jest.fn()
    render(
      <>
        <Modal isOpen onClose={onClose}>
          <div>inside</div>
        </Modal>
      </>,
    )
    const outside = screen.getByRole('presentation')
    userEvent.click(outside)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('should ignore bubbling and propagation', () => {
    const onClose = jest.fn()
    render(
      <>
        <Modal isOpen onClose={onClose}>
          <div>inside</div>
        </Modal>
      </>,
    )
    const inside = screen.getByText('inside')
    userEvent.click(inside)
    expect(onClose).not.toHaveBeenCalled()
  })
  it('should have the dialog role', () => {
    render(
      <Modal isOpen onClose={() => null}>
        <div />
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
  })
  it('should have aria-modal set to true', () => {
    render(
      <Modal isOpen onClose={() => null}>
        <div />
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })
})
