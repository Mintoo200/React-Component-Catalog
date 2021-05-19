import React from 'react'
import useAutoComplete from './Context'
import { ReducerActions } from './Reducer'

function Input(): React.ReactElement {
  const {
    currentInput, id, focussedItem, dispatch,
  } = useAutoComplete()
  function handleKeyPress(event: React.KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        dispatch({
          type: ReducerActions.focusNext,
        })
        break
      case 'ArrowUp':
        dispatch({
          type: ReducerActions.focusPrevious,
        })
        break
      case 'Enter':
        dispatch({
          type: ReducerActions.submit,
        })
        break
      default:
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
      onFocus={() => dispatch({ type: ReducerActions.gotFocus })}
      onBlur={() => dispatch({ type: ReducerActions.lostFocus })}
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
