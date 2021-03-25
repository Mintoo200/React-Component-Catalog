import React from 'react'
import NoContextError from '../../../errors/NoContextError'
import { Action } from './Reducer'

export type ContextType = {
  currentInput: string,
  onSubmit: (value: string) => void,
  hasFocus?: boolean,
  options?: string[],
  focussedItem: number,
  dispatch: React.Dispatch<Action>,
}

const Context = React.createContext({
  currentInput: '',
  onSubmit: () => { throw new NoContextError() },
  hasFocus: false,
  focussedItem: -1,
  dispatch: () => { throw new NoContextError() },
} as ContextType)

export default Context
