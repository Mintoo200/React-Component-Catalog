import React, { useState } from 'react'
import { Context } from './Context'

import '../style.css'

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
