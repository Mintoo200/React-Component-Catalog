import React, { useState } from 'react'

import '../style.css'

export type Props = {
  children: React.ReactElement|React.ReactElement[],
}

// Can't use React.FC here because it assumes the type of children
// and in this instance, since we use the children's children to render
// the content, we can't have React.ReactNode and need React.ReactElements
const Tabs = ({ children }: Props): React.ReactElement => {
  const [currentTab, setCurrentTab] = useState(0)

  const content: React.ReactNode[] = []
  const tabs = React.Children.map(children, (child, index): React.ReactNode => {
    content.push(child.props.children || [])
    return React.cloneElement(child, {
      active: currentTab === index,
      onClick: () => {
        setCurrentTab(index)
        return (child.props.onClick ?? false) ? child.props.onClick() : null
      },
      onKeyPress: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          setCurrentTab(index)
        }
        return (child.props.onKeyPress ?? false) ? child.props.onKeyPress(e) : null
      },
    })
  })

  /* Renders hidden tabs with `display: none;` */
  return (
    <div>
      <div className="tabs">{tabs}</div>
      {content.map((child, index) => (
        <div
          key={index}
          className={`content ${currentTab === index ? '' : 'hidden'}`}>
          {child}
        </div>
      ))}
    </div>
  )
  /* Renders only the current tab
  * return (
  *   <div>
  *     <div className="tabs">{tabs}</div>
  *     {content[currentTab]}
  *   </div>
  * )
  */
}

export default Tabs
