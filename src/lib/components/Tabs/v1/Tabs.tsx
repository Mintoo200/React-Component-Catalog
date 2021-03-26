import React, { useState } from 'react'

import '../style.css'

export type Props = {
  tabs: {label: React.ReactNode, content: React.ReactNode}[]
}

const Tabs: React.FC<Props> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <div>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            tabIndex={0}
            className={`tab ${currentTab === index ? 'active' : ''}`}
            onClick={() => setCurrentTab(index)}
            type="button">
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`content ${currentTab === index ? '' : 'hidden'}`}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
