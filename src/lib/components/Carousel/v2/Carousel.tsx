import React, { useEffect, useReducer } from 'react'
import NoContextError from '../../../errors/NoContextError'
import Context from './Context'
import Reducer, { ReducerActions } from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
  timer?: number,
  isPlaying?: boolean,
}

const Carousel = ({ children, timer = 1000, isPlaying = false }: Props): React.ReactElement => {
  const [state, dispatch] = useReducer(Reducer, {
    slideCount: 0,
    currentSlide: 0,
    isPlaying,
    timer,
    dispatch: () => { throw new NoContextError() },
  })
  useEffect(() => {
    dispatch({
      type: ReducerActions.setPlayTimer,
      timer,
    })
  }, [timer])
  return (
    <Context.Provider value={{
      ...state,
      dispatch,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Carousel
