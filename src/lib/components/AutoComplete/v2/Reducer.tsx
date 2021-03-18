import { Reducer as ReducerType } from 'react'
import InvalidActionError from '../../../errors/InvalidActionError'
import { ContextType } from './Context'

export enum ReducerActions {
  setCurrentInput,
  submit,
  gotFocus,
  lostFocus,
}

export type Action = {
  type: ReducerActions
  input?: string,
}

const Reducer: ReducerType<ContextType, Action> = (state, action) => {
  switch (action.type) {
    case ReducerActions.setCurrentInput:
      return {
        ...state,
        currentInput: action.input,
      }

    case ReducerActions.submit:
      state.onSubmit(action.input)
      return {
        ...state,
        currentInput: action.input,
      }

    case ReducerActions.gotFocus:
      return {
        ...state,
        hasFocus: true,
      }

    case ReducerActions.lostFocus:
      return {
        ...state,
        hasFocus: false,
      }

    default:
      throw new InvalidActionError(`Invalid action with ID ${action.type}`)
  }
}

export default Reducer
