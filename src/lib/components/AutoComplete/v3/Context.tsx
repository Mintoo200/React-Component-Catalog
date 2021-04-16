import React, { useContext } from 'react'
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

export const Context = React.createContext({
  currentInput: '',
  onSubmit: () => { throw new NoContextError() },
  hasFocus: false,
  focussedItem: -1,
  dispatch: () => { throw new NoContextError() },
} as ContextType)

export default function useAutoComplete(): ContextType {
  const context = useContext(Context)

  if (context == null) {
    throw new NoContextError()
  }

  return context
}
