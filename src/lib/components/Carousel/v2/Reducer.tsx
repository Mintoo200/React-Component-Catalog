import { Reducer as ReducerType } from 'react'
import InvalidActionError from '../../../errors/InvalidActionError'
import { ContextType } from './Context'

export enum ReducerActions {
  nextSlide,
  previousSlide,
  setCurrentSlide,
  setSlideCount,
  togglePlay,
  setPlayTimer,
}

export type Action = {
  type: ReducerActions.setSlideCount,
  count: number,
} | {
  type: ReducerActions.setCurrentSlide,
  index: number,
} | {
  type: ReducerActions.setPlayTimer,
  timer: number
} | {
  type: ReducerActions.nextSlide
    | ReducerActions.previousSlide
    | ReducerActions.togglePlay,
  count?: never,
  index?: never,
  timer?: never,
}

export const Reducer: ReducerType<ContextType, Action> = (state, action) => {
  switch (action.type) {
    case ReducerActions.nextSlide:
      return {
        ...state,
        currentSlide: (state.currentSlide + 1) % state.slideCount,
      }

    case ReducerActions.previousSlide:
      return {
        ...state,
        currentSlide: (state.currentSlide - 1 + state.slideCount) % state.slideCount,
      }

    case ReducerActions.setCurrentSlide:
      return {
        ...state,
        currentSlide: action.index % state.slideCount,
      }

    case ReducerActions.setSlideCount:
      return {
        ...state,
        slideCount: action.count,
        currentSlide: (state.currentSlide < action.count)
          ? state.currentSlide
          : action.count - 1,
      }

    case ReducerActions.togglePlay:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }

    case ReducerActions.setPlayTimer:
      return {
        ...state,
        timer: action.timer,
      }

    default:
      throw new InvalidActionError()
  }
}

export default Reducer
