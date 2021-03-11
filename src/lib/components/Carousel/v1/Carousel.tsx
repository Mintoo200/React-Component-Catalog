import React, { useReducer } from 'react'
import NoContextError from '../../Errors/NoContextError'
import Context from './Context'
import Reducer from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
}

const Carousel: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, {
    slideCount: 0,
    currentSlide: 0,
    dispatch: () => { throw new NoContextError() },
  })
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
