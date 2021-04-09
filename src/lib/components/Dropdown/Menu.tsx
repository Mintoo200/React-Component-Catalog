import React, { useState } from 'react'

export type Props = {
  children: React.ReactNode,
  label: React.ReactNode,
}

const Menu: React.FC<Props> = ({ children, label }) => {
  const [hasFocus, setFocus] = useState(false)
  return (
    <div
      onMouseEnter={() => setFocus(true)}
      onFocus={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      onBlur={() => setFocus(false)}>
      {label}
      <div className={`submenu ${hasFocus ? 'open' : 'closed'}`}>
        {children}
      </div>
    </div>
  )
}

export default Menu
