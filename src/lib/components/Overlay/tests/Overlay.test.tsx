import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { act } from 'react-dom/test-utils'
import Overlay from '../Overlay'

describe('Overlay tests', () => {
  it('should close when pressing Escape', () => {
    const onClose = jest.fn()
    render(
      <Overlay isOpen onClose={onClose}>
        <div />
      </Overlay>,
    )
    userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('should trap the focus', () => {
    render(
      <>
        <Overlay isOpen onClose={() => null}>
          <button type="button">inside</button>
        </Overlay>
        <button type="button">outside</button>
      </>,
    )
    const inside = screen.getByText('inside')
    const outside = screen.getByText('outside')
    inside.focus()
    userEvent.tab()
    expect(outside).not.toHaveFocus()
  })
  it('should return the focus to the last item on close', () => {
    function Component(): React.ReactElement {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)} type="button">open</button>
          <Overlay isOpen={open} onClose={() => setOpen(false)}>
            <button type="button">focus</button>
          </Overlay>
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
})
