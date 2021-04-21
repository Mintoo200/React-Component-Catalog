import React, { useState } from 'react'

import '../style.css'
import Item from './Item'

export type Props = {
  children: React.ReactNode,
}

const Dropdown: React.FC<Props> = ({ children }) => {
  const [focussedItem, setFocussedItem] = useState(0)
  const refs = React.Children.map(children, () => React.createRef<HTMLElement>())
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
      default: {
        const predicate = (item: React.RefObject<HTMLElement>) => (
          item?.current?.textContent.substring(0, 1).toLowerCase() === event.key
        )
        let newIndex = refs.slice(focussedItem).findIndex(predicate)
        if (newIndex === -1) {
          newIndex = refs.slice(0, focussedItem).findIndex(predicate)
        }
        if (newIndex === -1) {
          break
        }
        setFocussedItem(newIndex)
        break
      }
    }
  }
  return (
    <ul className="dropdown" onKeyDown={handleKey} role="menubar">
      {React.Children.map(children, (child, index) => (
        <Item key={index} hasFocus={focussedItem === index} ref={refs[index]}>
          {React.isValidElement(child)
            ? child
            : <button type="button">{child}</button>}
        </Item>
      ))}
    </ul>
  )
}

export default Dropdown
