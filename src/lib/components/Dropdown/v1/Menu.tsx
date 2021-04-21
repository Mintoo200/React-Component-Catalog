import React, { useState } from 'react'

export type Props = {
  children: React.ReactNode,
  label: React.ReactNode,
  tabIndex?: number,
}

const Menu = React.forwardRef<HTMLElement, Props>(({ children, label, tabIndex = -1 }, ref) => {
  const [hasFocus, setFocus] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  // The timeout is needed here because without it,
  // React looses focus of the label before grabbing focus on the submenu
  // causing the submenu loosing display and loosing "focussability" before grabbing it
  // TL;DR: need to delay focus lost to keep focus when accessing submenu (for a11y)
  const closeMenu = () => {
    const newTimeout = setTimeout(() => setFocus(false), 0)
    setTimeoutId(newTimeout)
  }
  const openMenu = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId)
    }
    setFocus(true)
  }
  return (
    <div
      onMouseEnter={openMenu}
      onFocus={openMenu}
      onMouseLeave={closeMenu}
      onBlur={closeMenu}
      className="label">
      {(React.isValidElement(label))
        ? React.cloneElement(label, { ref, tabIndex })
        : <button type="button" tabIndex={tabIndex}>{label}</button>}
      <ul className={`submenu ${hasFocus ? 'open' : 'closed'}`}>
        {React.Children.map(children, (child, index) => (
          <li key={index}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Menu
