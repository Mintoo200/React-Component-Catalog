import React, { Dispatch, useContext } from 'react'
import NoContextError from '../../../errors/NoContextError'

export type ContextType = {
  activeIndex: number,
  setActiveIndex: Dispatch<number>,
}

export const Context = React.createContext<ContextType | undefined>(undefined)

export default function useTabs(): ContextType {
  const context = useContext(Context)

  if (context == null) {
    throw new NoContextError()
  }

  return context
}
