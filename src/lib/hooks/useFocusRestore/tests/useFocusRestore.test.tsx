import React, {
  useLayoutEffect, useRef, useState,
} from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFocusRestore from '../useFocusRestore'

function FocusGrabber({ grabFocus = false }): React.ReactElement {
  const ref = useRef<HTMLButtonElement>()
  useLayoutEffect(() => {
    if (grabFocus) {
      ref?.current?.focus()
    }
  }, [grabFocus, ref?.current])
  return (
    <button ref={ref} type="button">grab</button>
  )
}

function Component(): React.ReactElement {
  const [open, setOpen] = useState(false)
  useFocusRestore(!open)
  return (
    <div role="presentation" onKeyDown={() => setOpen(!open)}>
      <button type="button">restore</button>
      <FocusGrabber grabFocus={open} />
    </div>
  )
}

describe('useFocus tests', () => {
  it('should restore the focus when restore changes value', () => {
    render(
      <Component />,
    )
    const initialFocus = screen.getByText('restore')
    const grabber = screen.getByText('grab')
    initialFocus.focus()
    expect(initialFocus).toHaveFocus()
    userEvent.keyboard('a')
    expect(grabber).toHaveFocus()
    userEvent.keyboard('a')
    expect(initialFocus).toHaveFocus()
  })
  it('should not restore the focus when moving focus if restore did not change value', () => {
    render(
      <>
        <Component />
        <button type="button">focus 1</button>
        <button type="button">focus 2</button>
      </>,
    )
    const focus1 = screen.getByText('focus 1')
    const focus2 = screen.getByText('focus 2')
    focus1.focus()
    expect(focus1).toHaveFocus()
    userEvent.tab()
    expect(focus2).toHaveFocus()
  })
  it('should restore the focus to the last focussed item', () => {
    function Component2(): React.ReactElement {
      const [open, setOpen] = useState(false)
      useFocusRestore(!open)
      return (
        <div role="presentation" onKeyDown={() => setOpen(!open)}>
          <button type="button">restore1</button>
          <button type="button">restore2</button>
          <FocusGrabber grabFocus={open} />
        </div>
      )
    }
    render(
      <Component2 />,
    )
    const lastFocus = screen.getByText('restore2')
    const grabber = screen.getByText('grab')
    lastFocus.focus()
    expect(lastFocus).toHaveFocus()
    userEvent.keyboard('a')
    expect(grabber).toHaveFocus()
    userEvent.keyboard('a')
    expect(lastFocus).toHaveFocus()
  })
})
