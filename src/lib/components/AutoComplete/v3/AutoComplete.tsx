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
  return (
    <div
      className="autocomplete"
      onFocus={() => dispatch({ type: ReducerActions.gotFocus })}
      onBlur={() => dispatch({ type: ReducerActions.lostFocus })}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          dispatch({
            type: ReducerActions.focusNext,
          })
        } else if (event.key === 'ArrowUp') {
          dispatch({
            type: ReducerActions.focusPrevious,
          })
        } else if (event.key === 'Enter') {
          dispatch({
            type: ReducerActions.submit,
          })
        }
      }}
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
