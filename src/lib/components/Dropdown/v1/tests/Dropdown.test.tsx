import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

  describe('Keyboard tests', () => {
    function openSubmenu(menu: HTMLElement, firstItem: HTMLElement): void {
      menu.focus()
      expect(menu).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      expect(firstItem).toBeVisible()
      expect(firstItem).toHaveFocus()
    }
    describe('Menubar tests', () => {
      describe('Focus moving tests', () => {
        it('should move the focus to the next item when pressing Right Arrow', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const nextItem = screen.getByText('Link 2')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{ArrowRight}')
          expect(nextItem).toHaveFocus()
        })
        it('should move the focus to the previous item when pressing Left Arrow', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 2')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()
          userEvent.keyboard('{ArrowLeft}')
          expect(firstItem).toHaveFocus()
        })
        it('should move the focus to the first item when pressing Right Arrow and focussing the last item', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
              <button type="button">Link 3</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()
          userEvent.keyboard('{ArrowRight}')
          expect(firstItem).toHaveFocus()
        })
        it('should move the focus to the last item when pressing Left Arrow and focussing the first item', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
              <button type="button">Link 3</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{ArrowLeft}')
          expect(lastItem).toHaveFocus()
        })
        it('should focus the first item when pressing Home', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
              <button type="button">Link 3</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const nextItem = screen.getByText('Link 2')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{ArrowRight}')
          expect(nextItem).toHaveFocus()
          userEvent.keyboard('{Home}')
          expect(firstItem).toHaveFocus()
        })
        it('should focus the last item when pressing End', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <button type="button">Link 1</button>
              <button type="button">Link 2</button>
              <button type="button">Link 3</button>
            </Dropdown>,
          )
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')
          firstItem.focus()
          expect(firstItem).toHaveFocus()
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()
        })
        describe('Character matching tests', () => {
          it('should focus the next item starting with the character when pressing a character', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <button type="button">a--</button>
                <button type="button">b--</button>
                <button type="button">c--</button>
              </Dropdown>,
            )
            const firstItem = screen.getByText('a--')
            const matchingItem = screen.getByText('b--')
            firstItem.focus()
            expect(firstItem).toHaveFocus()
            userEvent.keyboard('{b}')
            expect(matchingItem).toHaveFocus()
          })
          it('should loop on the items when no matching item after current item when pressing a character', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <button type="button">a--</button>
                <button type="button">b--</button>
                <button type="button">c--</button>
              </Dropdown>,
            )
            const firstItem = screen.getByText('a--')
            const nextItem = screen.getByText('b--')
            firstItem.focus()
            expect(firstItem).toHaveFocus()
            userEvent.keyboard('{ArrowRight}')
            expect(nextItem).toHaveFocus()
            userEvent.keyboard('{a}')
            expect(firstItem).toHaveFocus()
          })
          it('should not move the focus when no matching item when pressing a character', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <button type="button">a--</button>
                <button type="button">b--</button>
                <button type="button">c--</button>
              </Dropdown>,
            )
            const firstItem = screen.getByText('a--')
            firstItem.focus()
            expect(firstItem).toHaveFocus()
            userEvent.keyboard('{z}')
            expect(firstItem).toHaveFocus()
          })
          it('should move focus to the next matching item when current item also match the character when pressing a character', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <button type="button">a--</button>
                <button type="button">a--2</button>
                <button type="button">a--3</button>
              </Dropdown>,
            )
            const firstItem = screen.getByText('a--')
            const nextMatchingItem = screen.getByText('a--2')
            firstItem.focus()
            expect(firstItem).toHaveFocus()
            userEvent.keyboard('{a}')
            expect(nextMatchingItem).toHaveFocus()
          })
        })
      })
    })
    describe('Submenu tests', () => {
      describe('Focus moving tests', () => {
        it('should open the submenu and focus the first item when pressing Space on the label', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link')
          menu.focus()
          expect(menu).toHaveFocus()
          userEvent.keyboard('{space}')
          expect(firstItem).toBeVisible()
          expect(firstItem).toHaveFocus()
        })
        it('should open the submenu and focus the first item when pressing Enter on the label', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link')
          menu.focus()
          expect(menu).toHaveFocus()
          userEvent.keyboard('{Enter}')
          expect(firstItem).toBeVisible()
          expect(firstItem).toHaveFocus()
        })
        it('should open the submenu and focus the first item when pressing Down Arrow on the label', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          menu.focus()
          expect(menu).toHaveFocus()
          userEvent.keyboard('{ArrowDown}')
          expect(firstItem).toBeVisible()
          expect(firstItem).toHaveFocus()
        })
        it('should open the submenu and focus the last item when pressing Up Arrow on the label', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const lastItem = screen.getByText('Link 3')
          menu.focus()
          expect(menu).toHaveFocus()
          userEvent.keyboard('{ArrowUp}')
          expect(lastItem).toBeVisible()
          expect(lastItem).toHaveFocus()
        })
        it('should move focus to the next item when pressing Down Arrow in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const nextItem = screen.getByText('Link 2')

          openSubmenu(menu, firstItem)
          userEvent.keyboard('{ArrowDown}')
          expect(nextItem).toHaveFocus()
        })
        it('should move focus to the previous item when pressing Up Arrow in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const nextItem = screen.getByText('Link 2')

          openSubmenu(menu, firstItem)

          // move past first item
          userEvent.keyboard('{ArrowDown}')
          expect(nextItem).toHaveFocus()

          // move back to first item
          userEvent.keyboard('{ArrowUp}')
          expect(firstItem).toHaveFocus()
        })
        it('should move the focus to the first item when pressing Down Arrow and focussing the last item in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')

          openSubmenu(menu, firstItem)

          // move to last item
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()

          // move back to first item
          userEvent.keyboard('{ArrowDown}')
          expect(firstItem).toHaveFocus()
        })
        it('should move the focus to the last item when pressing Up Arrow and focussing the first item in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')

          openSubmenu(menu, firstItem)
          userEvent.keyboard('{ArrowUp}')
          expect(lastItem).toHaveFocus()
        })
        it('should move the focus to the first item when pressing Home in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')

          openSubmenu(menu, firstItem)

          // move to last item
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()

          // move back to first item
          userEvent.keyboard('{Home}')
          expect(firstItem).toHaveFocus()
        })
        it('should move the focus to the last item when pressing End in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')
          const lastItem = screen.getByText('Link 3')

          openSubmenu(menu, firstItem)
          userEvent.keyboard('{End}')
          expect(lastItem).toHaveFocus()
        })
        it('should close the submenu and focus the label when pressing Escape in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <button type="button">Link 1</button>
                <button type="button">Link 2</button>
                <button type="button">Link 3</button>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const firstItem = screen.getByText('Link 1')

          openSubmenu(menu, firstItem)
          userEvent.keyboard('{Escape}')
          expect(firstItem).not.toBeVisible()
          expect(menu).toHaveFocus()
        })
        describe('Character matching tests', () => {
          it('should focus the next item starting with the character when pressing a character in a submenu', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <Menu label="Menu">
                  <button type="button">a--</button>
                  <button type="button">b--</button>
                  <button type="button">c--</button>
                </Menu>
              </Dropdown>,
            )
            const menu = screen.getByText('Menu')
            const firstItem = screen.getByText('a--')
            const matchingItem = screen.getByText('b--')

            openSubmenu(menu, firstItem)

            userEvent.keyboard('{b}')
            expect(matchingItem).toHaveFocus()
          })
          it('should loop on the items when no matching item after current item when pressing a character in a submenu', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <Menu label="Menu">
                  <button type="button">a--</button>
                  <button type="button">b--</button>
                  <button type="button">c--</button>
                </Menu>
              </Dropdown>,
            )
            const menu = screen.getByText('Menu')
            const firstItem = screen.getByText('a--')
            const nextItem = screen.getByText('b--')

            openSubmenu(menu, firstItem)

            userEvent.keyboard('{ArrowDown}')
            expect(nextItem).toHaveFocus()
            userEvent.keyboard('{a}')
            expect(firstItem).toHaveFocus()
          })
          it('should not move the focus when no matching item when pressing a character in a submenu', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <Menu label="Menu">
                  <button type="button">a--</button>
                  <button type="button">b--</button>
                  <button type="button">c--</button>
                </Menu>
              </Dropdown>,
            )
            const menu = screen.getByText('Menu')
            const firstItem = screen.getByText('a--')

            openSubmenu(menu, firstItem)

            userEvent.keyboard('{z}')
            expect(firstItem).toHaveFocus()
          })
          it('should move focus to the next matching item when current item also match the character when pressing a character in a submenu', () => {
            renderWithStyle(
              <Dropdown aria-label="My Menu">
                <Menu label="Menu">
                  <button type="button">a--</button>
                  <button type="button">a--2</button>
                  <button type="button">a--3</button>
                </Menu>
              </Dropdown>,
            )
            const menu = screen.getByText('Menu')
            const firstItem = screen.getByText('a--')
            const nextMatchingItem = screen.getByText('a--2')

            openSubmenu(menu, firstItem)

            userEvent.keyboard('{a}')
            expect(nextMatchingItem).toHaveFocus()
          })
        })
      })
      describe('Submenu nesting tests', () => {
        it('should open the submenu and focus the first item when pressing Right Arrow on the label in a submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <Menu label="Nested Menu">
                  <button type="button">Link</button>
                </Menu>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const nestedMenu = screen.getByText('Nested Menu')
          const firstItem = screen.getByText('Link')

          openSubmenu(menu, nestedMenu)

          userEvent.keyboard('{ArrowRight}')
          expect(firstItem).toBeVisible()
          expect(firstItem).toHaveFocus()
        })
        it('should close the submenu and move focus to the label when pressing Left Arrow in a submenu\'s submenu', () => {
          renderWithStyle(
            <Dropdown aria-label="My Menu">
              <Menu label="Menu">
                <Menu label="Nested Menu">
                  <button type="button">Link</button>
                </Menu>
              </Menu>
            </Dropdown>,
          )
          const menu = screen.getByText('Menu')
          const nestedMenu = screen.getByText('Nested Menu')
          const firstItem = screen.getByText('Link')

          openSubmenu(menu, nestedMenu)

          userEvent.keyboard('{ArrowRight}')
          expect(firstItem).toBeVisible()
          expect(firstItem).toHaveFocus()

          userEvent.keyboard('{ArrowLeft}')
          expect(firstItem).not.toBeVisible()
          expect(nestedMenu).toHaveFocus()
        })
      })
    })
    describe('Sibling tests', () => {
      it('should move focus to the next item of the menubar when pressing Right Arrow if not on submenu label', () => {
        renderWithStyle(
          <Dropdown aria-label="My Menu">
            <Menu label="Menu 1">
              <button type="button">Link 1</button>
            </Menu>
            <Menu label="Menu 2">
              <button type="button">Link 2</button>
            </Menu>
          </Dropdown>,
        )
        const menu1 = screen.getByText('Menu 1')
        const menu2 = screen.getByText('Menu 2')
        const firstItem = screen.getByText('Link 1')
        openSubmenu(menu1, firstItem)

        userEvent.keyboard('{ArrowRight}')
        expect(menu2).toHaveFocus()
      })
      it('should still display the first level of submenu when moving to sibling from submenu', () => {
        renderWithStyle(
          <Dropdown aria-label="My Menu">
            <Menu label="Menu 1">
              <button type="button">Link 1</button>
            </Menu>
            <Menu label="Menu 2">
              <button type="button">Link 2</button>
            </Menu>
          </Dropdown>,
        )
        const menu1 = screen.getByText('Menu 1')
        const menu2 = screen.getByText('Menu 2')
        const firstItem = screen.getByText('Link 1')
        const submenu2 = screen.getByText('Link 2')
        openSubmenu(menu1, firstItem)

        userEvent.keyboard('{ArrowRight}')
        expect(menu2).toHaveFocus()
        expect(submenu2).toBeVisible()
      })
      it('should close the submenu preview when pressing Escape while focus is in the menubar', () => {
        renderWithStyle(
          <Dropdown aria-label="My Menu">
            <Menu label="Menu 1">
              <button type="button">Link 1</button>
            </Menu>
            <Menu label="Menu 2">
              <button type="button">Link 2</button>
            </Menu>
          </Dropdown>,
        )
        const menu1 = screen.getByText('Menu 1')
        const menu2 = screen.getByText('Menu 2')
        const firstItem = screen.getByText('Link 1')
        const submenu2 = screen.getByText('Link 2')
        openSubmenu(menu1, firstItem)

        userEvent.keyboard('{ArrowRight}')
        expect(menu2).toHaveFocus()
        expect(submenu2).toBeVisible()

        userEvent.keyboard('{Escape}')
        expect(menu2).toHaveFocus()
        expect(submenu2).not.toBeVisible()
      })
      it('should move focus to the previous item of the menubar when pressing Left Arrow if not in submenu\'s submenu', () => {
        renderWithStyle(
          <Dropdown aria-label="My Menu">
            <Menu label="Menu 1">
              <button type="button">Link 1</button>
            </Menu>
            <Menu label="Menu 2">
              <button type="button">Link 2</button>
            </Menu>
          </Dropdown>,
        )
        const menu1 = screen.getByText('Menu 1')
        const menu2 = screen.getByText('Menu 2')
        const submenu2 = screen.getByText('Link 2')
        userEvent.keyboard('{ArrowRight}')
        openSubmenu(menu2, submenu2)

        userEvent.keyboard('{ArrowLeft}')
        expect(menu1).toHaveFocus()
      })
    })
  })
})
