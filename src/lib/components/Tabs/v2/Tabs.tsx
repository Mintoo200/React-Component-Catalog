import React, { useState } from 'react'

import '../style.css'

export const Context = React.createContext({
  activeIndex: 0,
  setActiveIndex: (() => (null)) as (_: number) => void,
})

export type Props = {
  children: React.ReactNode,
}

const Tabs = ({ children }: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Context.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </Context.Provider>
  )
}
export default Tabs
