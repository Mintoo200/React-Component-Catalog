import React, { useState, Dispatch } from 'react'
import NoContextError from '../../Errors/NoContextError'

import '../style.css'

export const Context = React.createContext({
  activeIndex: 0,
  setActiveIndex: (() => { throw new NoContextError() }) as Dispatch<number>,
})

export type Props = {
  children: React.ReactNode,
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Context.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </Context.Provider>
  )
}
export default Tabs
