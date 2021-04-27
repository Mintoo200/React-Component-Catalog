import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from '../Dropdown'
import Menu from '../Menu'

function renderWithStyle(ui: React.ReactElement, ...args: unknown[]) {
  return render(
    <>
      <style>{'.closed { display: none; }'}</style>
      {ui}
    </>,
    ...args,
  )
}

const onClick = jest.fn()

function TestingMenu() {
  return (
    <Dropdown aria-label="My Menu">
      <button type="button" onClick={onClick}>Link 1</button>
      <Menu label="Submenu 1">
        <button type="button" onClick={onClick}>Link 2</button>
        <Menu label="Submenu 2">
          <button type="button" onClick={onClick}>Link 3</button>
        </Menu>
      </Menu>
    </Dropdown>
  )
}

describe('Dropdown tests', () => {
  it('should trigger onClick when button clicked', () => {
    renderWithStyle(<TestingMenu />)
    userEvent.click(screen.getByText('Link 1'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  it('should hide all submenus', () => {
    renderWithStyle(<TestingMenu />)
    expect(screen.getByText('Link 2')).not.toBeVisible()
  })
  it('should open menus when hovering', () => {
    renderWithStyle(<TestingMenu />)
    userEvent.hover(screen.getByText('Submenu 1'))
    expect(screen.getByText('Link 2')).toBeVisible()
    expect(screen.getByText('Link 3')).not.toBeVisible()
  })
  it('should open any number of submenu when hovering', () => {
    renderWithStyle(<TestingMenu />)
    userEvent.hover(screen.getByText('Submenu 1'))
    userEvent.hover(screen.getByText('Submenu 2'))
    expect(screen.getByText('Link 3')).toBeVisible()
  })
  it('should support custom buttons', () => {
    const CustomButton = React.forwardRef<HTMLButtonElement>((props, ref) => (
      <button ref={ref} type="button" onClick={onClick}>Hello</button>
    ))
    renderWithStyle(
      <Dropdown aria-label="My Menu">
        <CustomButton />
      </Dropdown>,
    )
    userEvent.click(screen.getByText('Hello'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
