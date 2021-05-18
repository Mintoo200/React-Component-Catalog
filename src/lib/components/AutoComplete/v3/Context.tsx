import React, { useContext } from 'react'
import NoContextError from '../../../errors/NoContextError'
import { Action, State } from './Reducer'

export type ContextType = State & {
  dispatch: React.Dispatch<Action>,
}

export const Context = React.createContext<ContextType | undefined>(undefined)

export default function useAutoComplete(): ContextType {
  const context = useContext(Context)

  if (context == null) {
    throw new NoContextError()
  }

  return context
}
