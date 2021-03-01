import React, { useContext } from 'react'
import { Context } from './Tabs'

type Props = {
  children: React.ReactElement|React.ReactElement[],
}

const TabList = ({ children }: Props): JSX.Element => {
  const { activeIndex, setActiveIndex } = useContext(Context)
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => (
        React.cloneElement(child, {
          active: activeIndex === index,
          onClick: () => setActiveIndex(index),
        })
      ))}
    </div>
  )
}

export default TabList
