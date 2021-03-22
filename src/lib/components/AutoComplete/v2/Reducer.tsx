import { Reducer as ReducerType } from 'react'
import InvalidActionError from '../../../errors/InvalidActionError'
import { ContextType } from './Context'

export enum ReducerActions {
  setCurrentInput,
  submit,
  gotFocus,
  lostFocus,
  setOptions,
  focusNext,
  focusPrevious,
  setFocussed,
}

export type Action = {
  type: ReducerActions
  input?: string,
  options?: string[],
  index?: number,
}

const Reducer: ReducerType<ContextType, Action> = (state, action) => {
  switch (action.type) {
    case ReducerActions.setCurrentInput:
      return {
        ...state,
        currentInput: action.input,
        focussedItem: -1,
      }

    case ReducerActions.submit:
      if (state.focussedItem !== -1) {
        state.onSubmit(state.options[state.focussedItem])
        return {
          ...state,
          currentInput: state.options[state.focussedItem],
        }
      }
      state.onSubmit(state.currentInput)
      return state

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

    case ReducerActions.setOptions:
      return {
        ...state,
        options: action.options,
        focussedItem: -1,
      }

    case ReducerActions.focusNext:
      return {
        ...state,
        focussedItem: ((state.focussedItem + 2) % (state.options.length + 1)) - 1,
      }

    case ReducerActions.focusPrevious:
      return {
        ...state,
        focussedItem: (state.focussedItem === -1)
          ? state.options.length - 1
          : state.focussedItem - 1,
      }

    case ReducerActions.setFocussed:
      /* eslint-disable */
      console.log(action.index)
      return {
        ...state,
        focussedItem: action.index,
      }

    default:
      throw new InvalidActionError(`Invalid action with ID ${action.type}`)
  }
}

export default Reducer
