import { Reducer as ReducerType } from 'react'
import InvalidActionError from '../../Errors/InvalidActionError'
import { ContextType } from './Context'

export type Action = {
  type: ReducerActions,
  slideCount?: number,
  slideIndex?: number,
}

export enum ReducerActions {
  nextSlide,
  previousSlide,
  setCurrentSlide,
  setSlideCount,
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
        currentSlide: action.slideIndex % state.slideCount,
      }

    case ReducerActions.setSlideCount:
      return {
        ...state,
        slideCount: action.slideCount,
        currentSlide: (state.currentSlide < action.slideCount)
          ? state.currentSlide
          : action.slideCount - 1,
      }

    default:
      throw new InvalidActionError(`Invalid action with ID ${action.type}`)
  }
}

export default Reducer
