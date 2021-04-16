import React from 'react'
import useAutoComplete from './Context'
import { ReducerActions } from './Reducer'

const Input = (): React.ReactElement => {
  const { currentInput, dispatch } = useAutoComplete()
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
