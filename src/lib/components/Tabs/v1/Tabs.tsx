import React, { useState } from 'react'

import '../style.css'

type Props = {
  children: React.ReactElement|React.ReactElement[],
}

const Tabs = ({ children }: Props): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0)

  const content = []
  const tabs = React.Children.map(children, (child, index): React.ReactNode => {
    content.push(child.props.children || [])
    return React.cloneElement(child, {
      active: currentTab === index,
      onClick: () => {
        setCurrentTab(index)
        return (child.props.onClick ?? false) ? child.props.onClick() : null
      },
      onKeyPress: (e) => {
        if (e.key === 'Enter') {
          setCurrentTab(index)
        }
        return (child.props.onKeyPress ?? false) ? child.props.onKeyPress(e) : null
      },
    })
  })

  return (
    <div>
      <div className="tabs">{tabs}</div>
      {content.map((child, index) => (
        <div
          key={index}
          className={`content ${currentTab === index ? '' : 'content-hidden'}`}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Tabs
