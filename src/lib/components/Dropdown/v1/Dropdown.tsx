import React, { useEffect, useState } from 'react'

import '../style.css'
import Item from './Item'
import Menu from './Menu'

export type Props = {
  children: React.ReactNode,
}

const Dropdown: React.FC<Props> = ({ children }) => {
  const [focussedItem, setFocussedItem] = useState(0)
  const [refs, setRefs] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  useEffect(() => {
    setRefs(React.Children.map(children, () => React.createRef<HTMLElement>()))
  }, [children])
  function focusNext() {
    const count = React.Children.count(children)
    setFocussedItem((focussedItem + 1) % count)
  }
  function focusPrevious() {
    const count = React.Children.count(children)
    setFocussedItem((focussedItem - 1 + count) % count)
  }
  const handleKey = (event: React.KeyboardEvent) => {
    const itemCount = React.Children.count(children)
    switch (event.key) {
      case 'Escape':
        setOpenMenu(false)
        break
      case 'ArrowRight':
        focusNext()
        break
      case 'ArrowLeft':
        focusPrevious()
        break
      case 'Home':
        setFocussedItem(0)
        break
      case 'End':
        setFocussedItem(itemCount - 1)
        break
      default: {
        const predicate = (item: React.RefObject<HTMLElement>) => (
          item?.current?.textContent.substring(0, 1).toLowerCase() === event.key.toLowerCase()
        )
        let newIndex = refs.slice(focussedItem + 1).findIndex(predicate)
        if (newIndex === -1) {
          newIndex = refs.slice(0, focussedItem).findIndex(predicate)
          if (newIndex === -1) {
            break
          }
        } else {
          newIndex += focussedItem + 1
        }
        setFocussedItem(newIndex)
        break
      }
    }
  }
  return (
    <ul className="dropdown" onKeyDown={handleKey} role="menubar">
      {React.Children.map(children, (child, index) => (
        <Item
          key={index}
          hasFocus={focussedItem === index}
          ref={refs[index]}
          onClick={() => setFocussedItem(index)}>
          {React.isValidElement(child)
            ? (child.type === Menu)
              ? React.cloneElement(child, {
                onClose: () => { refs[focussedItem]?.current?.focus() },
                opensDownward: true,
                openNextSibling: () => { focusNext(); setOpenMenu(true) },
                openPreviousSibling: () => { focusPrevious(); setOpenMenu(true) },
                open: focussedItem === index && openMenu,
              })
              : child
            : <button type="button">{child}</button>}
        </Item>
      ))}
    </ul>
  )
}

export default Dropdown
