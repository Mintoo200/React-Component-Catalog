import React, { Dispatch } from 'react'
import NoContextError from '../../Errors/NoContextError'
import { Action } from './Reducer'

export type ContextType = {
  slideCount: number,
  currentSlide: number,
  dispatch: Dispatch<Action>,
}

export const Context = React.createContext({
  slideCount: 0,
  currentSlide: 0,
  dispatch: () => { throw new NoContextError() },
} as ContextType)

export default Context
