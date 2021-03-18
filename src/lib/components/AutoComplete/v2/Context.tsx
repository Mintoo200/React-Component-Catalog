import React from 'react'
import NoContextError from '../../../errors/NoContextError'

export type ContextType = {
  currentInput: string,
  setCurrentInput: React.Dispatch<string>,
  onSubmit: (value: string) => void,
  hasFocus?: boolean,
  setHasFocus: React.Dispatch<boolean>
}

const Context = React.createContext({
  currentInput: '',
  setCurrentInput: () => { throw new NoContextError() },
  onSubmit: () => { throw new NoContextError() },
  hasFocus: false,
  setHasFocus: () => { throw new NoContextError() },
} as ContextType)

export default Context
