import React, { useReducer } from 'react'
import NoContextError from '../../../errors/NoContextError'
import Context from './Context'
import Reducer, { ReducerActions } from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
}

const AutoComplete: React.FC<Props> = ({ children, onSubmit }) => {
  const [state, dispatch] = useReducer(Reducer, {
    currentInput: '',
    hasFocus: false,
    onSubmit,
    dispatch: () => { throw new NoContextError() },
  })
  return (
    <div
      className="autocomplete"
      onFocus={() => dispatch({ type: ReducerActions.gotFocus })}
      onBlur={() => dispatch({ type: ReducerActions.lostFocus })}>
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
