import React, { useContext } from 'react'
import Context from './Context'
import { ReducerActions } from './Reducer'

const Input: React.FC = () => {
  const { currentInput, dispatch } = useContext(Context)
  return (
    <input
      name="find"
      autoComplete="off"
      value={currentInput}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
        dispatch({
          type: ReducerActions.setCurrentInput,
          input: event.currentTarget.value,
        })
      )} />
  )
}

export default Input
