import React, { useContext } from 'react'
import { Context } from './Tabs'

type Props = {
  children: React.ReactNodeArray,
}

const TabContent = ({ children }: Props): JSX.Element => {
  const { activeIndex } = useContext(Context)
  return (
    <div className="content">
      {children[activeIndex]}
    </div>
  )
}
export default TabContent
