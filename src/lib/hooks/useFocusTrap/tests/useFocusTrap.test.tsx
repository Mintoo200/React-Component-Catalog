import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import useFocusTrap from '../useFocusTrap'

describe('useFocusTrap tests', () => {
  it('should disable all focussable nodes outside of the ref when active', () => {
    function Component() {
      const trap = useFocusTrap<HTMLDivElement>(true)
      return (
        <div ref={trap}>
          <button type="button">Inside</button>
        </div>
      )
    }
    render(
      <>
        <Component />
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
  it('should not disable focussable nodes when inactive', () => {
    function Component() {
      const trap = useFocusTrap<HTMLDivElement>(false)
      return (
        <div ref={trap}>
          <button type="button">Inside</button>
        </div>
      )
    }
    render(
      <>
        <Component />
        <button type="button">Outside</button>
      </>,
    )
    const outsideTrap = screen.getByText('Outside')
    const insideTrap = screen.getByText('Inside')
    insideTrap.focus()
    userEvent.tab()
    expect(outsideTrap).toHaveFocus()
  })
  it('should restore the tab order of the disabled nodes when deactivated', () => {
    function Component() {
      const [active, setActive] = useState(true)
      const trap = useFocusTrap<HTMLDivElement>(active)
      return (
        <div ref={trap}>
          <button type="button" onClick={() => setActive(!active)} tabIndex={-1}>toggle</button>
        </div>
      )
    }
    render(
      <>
        <Component />
        {/* eslint-disable jsx-a11y/tabindex-no-positive */}
        <button type="button" tabIndex={2}>First</button>
        <button type="button" tabIndex={1}>Second</button>
        <button type="button" tabIndex={2}>Third</button>
        {/* eslint-enable jsx-a11y/tabindex-no-positive */}
      </>,
    )
    const toggle = screen.getByText('toggle')
    const first = screen.getByText('First')
    const second = screen.getByText('Second')
    const third = screen.getByText('Third')
    toggle.click()
    first.focus()
    userEvent.tab()
    expect(third).toHaveFocus()
    userEvent.tab()
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(second).toHaveFocus()
  })
  it('should keep the tab order inside the trap', () => {
    function Component() {
      const trap = useFocusTrap<HTMLDivElement>(true)
      return (
        <div ref={trap}>
          {/* eslint-disable jsx-a11y/tabindex-no-positive */}
          <button type="button" tabIndex={2}>First</button>
          <button type="button" tabIndex={1}>Second</button>
          <button type="button" tabIndex={2}>Third</button>
          {/* eslint-enable jsx-a11y/tabindex-no-positive */}
        </div>
      )
    }
    render(<Component />)
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
})
