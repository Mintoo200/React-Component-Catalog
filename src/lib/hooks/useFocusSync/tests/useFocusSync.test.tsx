import React, { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import useSyncFocus, { SyncProvider } from '../useFocusSync'

function FocusDisplay({ children = null, id = null }: {children?: React.ReactNode, id?: number}) {
  const ref = useRef<HTMLDivElement>()
  const {
    hasFocus, hasDirectFocus, hasIndirectFocus, syncedChildHasFocus, syncFocus,
  } = useSyncFocus(ref)
  return (
    <div onFocus={syncFocus} onBlur={syncFocus} data-testid={id?.toString()} ref={ref} tabIndex={0} role="button">
      {`hasFocus: ${hasFocus.toString()}`}
      {`hasDirectFocus: ${hasDirectFocus.toString()}`}
      {`hasIndirectFocus: ${hasIndirectFocus.toString()}`}
      {`syncedChildHasFocus: ${syncedChildHasFocus.toString()}`}
      {children}
    </div>
  )
}

describe('useSyncFocus tests', () => {
  describe.each([
    ['hasFocus', [true, false, true, true]],
    ['hasDirectFocus', [true, false, false, false]],
    ['hasIndirectFocus', [false, false, true, true]],
    ['syncedChildHasFocus', [false, false, false, true]],
  ])('%s tests', (property: string, expectedResults: boolean[]) => {
    it(`should set ${property} to ${expectedResults[0].toString()} when focussing directly the item`, () => {
      render(
        <SyncProvider>
          <FocusDisplay id={0} />
        </SyncProvider>,
      )
      const button = screen.getByTestId(0)
      button.focus()
      expect(button).toHaveTextContent(new RegExp(`${property}: ${expectedResults[0].toString()}`))
    })
    it(`should set ${property} to ${expectedResults[1].toString()} when losing focus on the item`, () => {
      render(
        <SyncProvider>
          <FocusDisplay id={0} />
          <button type="button">Grab Focus</button>
        </SyncProvider>,
      )
      const button = screen.getByTestId(0)
      const grabFocus = screen.getByText('Grab Focus')
      button.focus()
      grabFocus.focus()
      expect(button).toHaveTextContent(new RegExp(`${property}: ${expectedResults[1].toString()}`))
    })
    it(`should set ${property} to ${expectedResults[2].toString()} when focussing indirectly the item`, () => {
      render(
        <SyncProvider>
          <FocusDisplay id={0}>
            <button type="button">Grab Focus</button>
          </FocusDisplay>
        </SyncProvider>,
      )
      const button = screen.getByTestId(0)
      const grabFocus = screen.getByText('Grab Focus')
      grabFocus.focus()
      expect(button).toHaveTextContent(new RegExp(`${property}: ${expectedResults[2].toString()}`))
    })
    it(`should set ${property} to ${expectedResults[3].toString()} when focussing a synced child`, () => {
      render(
        <SyncProvider>
          <FocusDisplay id={0}>
            <FocusDisplay id={1} />
          </FocusDisplay>
        </SyncProvider>,
      )
      const button = screen.getByTestId(0)
      const button2 = screen.getByTestId(1)
      button2.focus()
      expect(button).toHaveTextContent(new RegExp(`${property}: ${expectedResults[3].toString()}`))
    })
  })
})
