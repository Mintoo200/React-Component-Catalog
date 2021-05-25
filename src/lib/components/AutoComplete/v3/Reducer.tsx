import { Reducer as ReducerType, RefObject } from 'react'
import InvalidActionError from '../../../errors/InvalidActionError'
import { OptionRef } from './Option'

export enum ReducerActions {
  setCurrentInput,
  submit,
  openList,
  closeList,
  setOptions,
  focusNext,
  focusPrevious,
  setFocussed,
}

export type Action = {
  type: ReducerActions.setCurrentInput,
  input: string | undefined,
} | {
  type: ReducerActions.setOptions,
  options: RefObject<OptionRef>[],
} | {
  type: ReducerActions.setFocussed,
  index: number,
} | {
  type: ReducerActions.submit
    | ReducerActions.openList
    | ReducerActions.closeList
    | ReducerActions.focusNext
    | ReducerActions.focusPrevious,
  input?: never,
  options?: never,
  index?: never,
}

export type State = {
  currentInput: string,
  isOpen: boolean,
  onSubmit: (value: string) => void,
  options: RefObject<OptionRef>[],
  focussedItem: number,
}

const Reducer: ReducerType<State, Action> = (state, action) => {
  switch (action.type) {
    case ReducerActions.setCurrentInput:
      return {
        ...state,
        currentInput: action.input,
        focussedItem: -1,
      }

    case ReducerActions.submit:
      if (state.focussedItem !== -1) {
        state.onSubmit(state.options[state.focussedItem]?.current?.value)
        return {
          ...state,
          currentInput: state.options[state.focussedItem]?.current?.value,
        }
      }
      state.onSubmit(state.currentInput)
      return state

    case ReducerActions.openList:
      return {
        ...state,
        isOpen: true,
      }

    case ReducerActions.closeList:
      return {
        ...state,
        focussedItem: -1,
        isOpen: false,
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
        isOpen: true,
      }

    case ReducerActions.focusPrevious:
      return {
        ...state,
        focussedItem: (state.focussedItem === -1)
          ? state.options.length - 1
          : state.focussedItem - 1,
        isOpen: true,
      }

    case ReducerActions.setFocussed:
      return {
        ...state,
        focussedItem: action.index,
      }

    default:
      throw new InvalidActionError()
  }
}

export default Reducer
