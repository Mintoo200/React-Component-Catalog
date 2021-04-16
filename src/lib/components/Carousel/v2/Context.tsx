import React, { Dispatch, useContext } from 'react'
import NoContextError from '../../../errors/NoContextError'
import { Action } from './Reducer'

export type ContextType = {
  slideCount: number,
  currentSlide: number,
  isPlaying: boolean,
  timer: number,
  dispatch: Dispatch<Action>,
}

export const Context = React.createContext<ContextType | undefined>(undefined)

export default function useCarousel(): ContextType {
  const context = useContext(Context)

  if (context == null) {
    throw new NoContextError()
  }

  return context
}
