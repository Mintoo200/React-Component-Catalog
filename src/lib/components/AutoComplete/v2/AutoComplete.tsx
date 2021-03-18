import React, { useState } from 'react'
import Context from './Context'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
}

const AutoComplete: React.FC<Props> = ({ children, onSubmit }) => {
  const [currentInput, setCurrentInput] = useState('')
  return (
    <div className="autocomplete">
      <Context.Provider value={{
        currentInput,
        setCurrentInput,
        onSubmit: (value) => {
          setCurrentInput(value)
          onSubmit(value)
        },
      }}>
        {children}
      </Context.Provider>
    </div>
  )
}

export default AutoComplete
