import React, { useContext } from 'react'
import Context from './Context'
import { ReducerActions } from './Reducer'

export const Next: React.FC = () => {
  const { dispatch } = useContext(Context)
  return (
    <button
      onClick={() => dispatch({
        type: ReducerActions.nextSlide,
      })}
      type="button">
      Next
    </button>
  )
}

export const Previous: React.FC = () => {
  const { dispatch } = useContext(Context)
  return (
    <button
      onClick={() => dispatch({
        type: ReducerActions.previousSlide,
      })}
      type="button">
      Previous
    </button>
  )
}
