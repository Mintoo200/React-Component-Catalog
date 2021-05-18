import React, { useLayoutEffect, useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useID from '../useID'

function ComponentWithID({ children }: {children?: React.ReactNode}) {
  const id = useID()
  return (
    <div id={id.toString()}>{children}</div>
  )
}

describe('useID tests', () => {
  it('should return unique ids', () => {
    render(
      <>
        <ComponentWithID>First</ComponentWithID>
        <ComponentWithID>Second</ComponentWithID>
      </>,
    )
    const first = screen.getByText('First')
    const second = screen.getByText('Second')
    expect(first.id).not.toEqual(second.id)
  })
  it('should return the same unique id for the same component instance', () => {
    let renderCount = 0
    function ComponentWithState({ children }: {children: React.ReactNode}) {
      const [renderCountState, setRenderCount] = useState(1)
      useLayoutEffect(() => {
        renderCount = renderCountState
      }, [renderCountState])
      return (
        <>
          <button type="button" onClick={() => setRenderCount(renderCountState + 1)}>
            re-render
          </button>
          {children}
        </>
      )
    }
    render(
      <>
        <ComponentWithState>
          <ComponentWithID>Item</ComponentWithID>
        </ComponentWithState>
      </>,
    )
    const button = screen.getByText('re-render')
    const item = screen.getByText('Item')
    const previousId = item.id
    expect(renderCount).toBe(1)
    userEvent.click(button)
    expect(renderCount).toBe(2)
    expect(previousId).toEqual(item.id)
  })
})
