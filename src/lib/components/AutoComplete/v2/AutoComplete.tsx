import React, { useState } from 'react'
import Context from './Context'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
}

const AutoComplete: React.FC<Props> = ({ children, onSubmit }) => {
  const [currentInput, setCurrentInput] = useState('')
  const [hasFocus, setHasFocus] = useState(false)
  return (
    <div
      className="autocomplete"
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}>
      <Context.Provider value={{
        currentInput,
        setCurrentInput,
        onSubmit: (value) => {
          setCurrentInput(value)
          onSubmit(value)
        },
        hasFocus,
        setHasFocus,
      }}>
        {children}
      </Context.Provider>
    </div>
  )
}

export default AutoComplete
