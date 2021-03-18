import React, { useContext } from 'react'
import Context from './Context'

const Input: React.FC = () => {
  const { currentInput, setCurrentInput } = useContext(Context)
  return (
    <input
      name="find"
      autoComplete="off"
      value={currentInput}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
        setCurrentInput(event.currentTarget.value)
      )} />
  )
}

export default Input
