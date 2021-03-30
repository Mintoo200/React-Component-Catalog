import React, { useState, Dispatch } from 'react'
import NoContextError from '../../../errors/NoContextError'

import '../style.css'

export const Context = React.createContext({
  activeIndex: 0,
  setActiveIndex: (() => { throw new NoContextError() }) as Dispatch<number>,
})

export type Props = {
  children: React.ReactNode,
}

const Tabs = ({ children }: Props): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Context.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </Context.Provider>
  )
}
export default Tabs
