import React from 'react'
import useAutoComplete from './Context'
import { ReducerActions } from './Reducer'

function Input(): React.ReactElement {
  const {
    currentInput, id, focussedItem, dispatch,
  } = useAutoComplete()
  function handleKeyPress(event: React.KeyboardEvent) {
    event.stopPropagation()
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        dispatch({
          type: ReducerActions.focusNext,
        })
        break
      case 'ArrowUp':
        event.preventDefault()
        dispatch({
          type: ReducerActions.focusPrevious,
        })
        break
      case 'Enter':
        event.preventDefault()
        dispatch({
          type: ReducerActions.submit,
        })
        break
      case 'Escape':
        event.preventDefault()
        dispatch({
          type: ReducerActions.closeList,
        })
        break
      default:
        dispatch({
          type: ReducerActions.setFocussed,
          index: -1,
        })
        break
    }
  }

  return (
    <input
      type="text"
      autoComplete="off"
      aria-autocomplete="list"
      id={id}
      aria-controls={`${id}-options`}
      aria-activedescendant={focussedItem !== -1 ? `${id}-options-${focussedItem}` : null}
      value={currentInput}
      onFocus={() => dispatch({ type: ReducerActions.openList })}
      onBlur={() => dispatch({ type: ReducerActions.closeList })}
      onKeyDown={handleKeyPress}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
        dispatch({
          type: ReducerActions.setCurrentInput,
          input: event.currentTarget.value,
        })
      )} />
  )
}

export default Input
