import React from 'react'
import NoContextError from '../../../errors/NoContextError'

export type ContextType = {
  currentInput: string,
  setCurrentInput: React.Dispatch<string>,
  onSubmit: (value: string) => void,
}

const Context = React.createContext({
  currentInput: '',
  setCurrentInput: () => { throw new NoContextError() },
  onSubmit: () => { throw new NoContextError() },
} as ContextType)

export default Context
