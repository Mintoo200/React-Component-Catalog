import React, { useState } from 'react'

import '../style.css'
import Item from './Item'

export type Props = {
  children: React.ReactNode,
}

const Dropdown: React.FC<Props> = ({ children }) => {
  const [focussedItem, setFocussedItem] = useState(0)
  const handleKey = (event: React.KeyboardEvent) => {
    const itemCount = React.Children.count(children)
    switch (event.key) {
      case 'Space':
      case 'Enter':
      case 'ArrowDown':
        // FIXME: open submenu and focus first element
        break
      case 'ArrowUp':
        // FIXME: open submenu and focus last element
        break
      case 'ArrowRight':
        setFocussedItem((focussedItem + 1) % itemCount)
        break
      case 'ArrowLeft':
        setFocussedItem((focussedItem - 1 + itemCount) % itemCount)
        break
      case 'Home':
        setFocussedItem(0)
        break
      case 'End':
        setFocussedItem(itemCount - 1)
        break
      default:
        // FIXME: focus next item starting with character
        // do not change focus if none found
        break
    }
  }
  return (
    <ul className="dropdown" onKeyDown={handleKey} role="menubar">
      {React.Children.map(children, (child, index) => (
        <Item key={index} hasFocus={focussedItem === index}>
          {React.isValidElement(child)
            ? child
            : <button type="button">{child}</button>}
        </Item>
      ))}
    </ul>
  )
}

export default Dropdown
