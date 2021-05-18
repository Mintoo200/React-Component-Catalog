import React, { useReducer } from 'react'
import NoContextError from '../../../errors/NoContextError'
import { Context } from './Context'
import Reducer, { ReducerActions } from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
}

const AutoComplete = ({ children, onSubmit }: Props): React.ReactElement => {
  const [state, dispatch] = useReducer(Reducer, {
    currentInput: '',
    hasFocus: false,
    onSubmit,
    focussedItem: -1,
    dispatch: () => { throw new NoContextError() },
  })
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
    <div
      className="autocomplete"
      onFocus={() => dispatch({ type: ReducerActions.gotFocus })}
      onBlur={() => dispatch({ type: ReducerActions.lostFocus })}
      onKeyDown={handleKeyPress}
      role="presentation">
      <Context.Provider value={{
        ...state,
        dispatch,
      }}>
        {children}
      </Context.Provider>
    </div>
  )
}

export default AutoComplete
