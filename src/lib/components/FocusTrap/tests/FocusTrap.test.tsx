import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FocusTrap from '../FocusTrap'

describe('AutoComplete tests', () => {
  it('should trap the focus when active', () => {
    render(
      <>
        <FocusTrap active>
          <button type="button">Inside</button>
        </FocusTrap>
        <button type="button">Outside</button>
      </>,
    )
    const outsideTrap = screen.getByText('Outside')
    const insideTrap = screen.getByText('Inside')
    insideTrap.focus()
    userEvent.tab()
    expect(document.body).toHaveFocus()
    expect(outsideTrap).not.toHaveFocus()
    userEvent.tab()
    expect(insideTrap).toHaveFocus()
    expect(outsideTrap).not.toHaveFocus()
  })
  it('should not trap the focus when not active', () => {
    render(
      <>
        <FocusTrap active>
          <button type="button">Inside</button>
        </FocusTrap>
        <button type="button">Outside</button>
      </>,
    )
    const outsideTrap = screen.getByText('Outside')
    const insideTrap = screen.getByText('Inside')
    insideTrap.focus()
    userEvent.tab()
    expect(outsideTrap).not.toHaveFocus()
  })
  it('should keep the tab order inside of the trap', () => {
    render(
      <>
        <FocusTrap active>
          {/* eslint-disable jsx-a11y/tabindex-no-positive */}
          <button type="button" tabIndex={2}>First</button>
          <button type="button" tabIndex={1}>Second</button>
          <button type="button" tabIndex={2}>Third</button>
          {/* eslint-enable jsx-a11y/tabindex-no-positive */}
        </FocusTrap>
      </>,
    )
    const first = screen.getByText('First')
    const second = screen.getByText('Second')
    const third = screen.getByText('Third')
    first.focus()
    userEvent.tab()
    expect(third).toHaveFocus()
    userEvent.tab()
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(second).toHaveFocus()
  })
  it('should restore the tab order outside of the trap when not active', () => {
    function TogglableTrap() {
      const [active, setActive] = useState(false)
      return (
        <FocusTrap active={active}>
          <button type="button" onClick={() => setActive(!active)} tabIndex={-1}>toggle trap</button>
        </FocusTrap>
      )
    }
    render(
      <>
        <TogglableTrap />
        {/* eslint-disable jsx-a11y/tabindex-no-positive */}
        <button type="button" tabIndex={2}>First</button>
        <button type="button" tabIndex={1}>Second</button>
        <button type="button" tabIndex={2}>Third</button>
        {/* eslint-enable jsx-a11y/tabindex-no-positive */}
      </>,
    )
    const toggle = screen.getByText('toggle trap')
    const first = screen.getByText('First')
    const second = screen.getByText('Second')
    const third = screen.getByText('Third')
    toggle.click()
    toggle.click()
    first.focus()
    userEvent.tab()
    expect(third).toHaveFocus()
    userEvent.tab()
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(second).toHaveFocus()
  })
})
