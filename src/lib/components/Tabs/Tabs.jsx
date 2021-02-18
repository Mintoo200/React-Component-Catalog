import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  children: [],
}

const Tabs = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const content = []
  const tabs = React.Children.map(children, (child, index) => {
    content.push(child.props.children || [])
    return React.cloneElement(child, {
      active: currentTab === index,
      onClick: () => setCurrentTab(index),
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

Tabs.propTypes = propTypes
Tabs.defaultProps = defaultProps

export default Tabs
