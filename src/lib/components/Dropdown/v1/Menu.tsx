import React, { useEffect, useState } from 'react'
import Item from './Item'

export type Props = {
  children: React.ReactNode,
  label: React.ReactNode,
  tabIndex?: number,
  onClose?: () => void,
  opensDownward?: boolean,
}

const Menu = React.forwardRef<HTMLElement, Props>(({
  children, label, tabIndex = -1, onClose = () => null, opensDownward = false,
}, ref) => {
  const [focussedItem, setFocussedItem] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const [refs, setRefs] = useState([])
  useEffect(() => {
    setRefs(React.Children.map(children, () => React.createRef<HTMLElement>()))
  }, [children])
  useEffect(() => {
    if (!isOpen) {
      // call onClose when closing
      onClose()
    }
  }, [isOpen])
  const handleKey = (event: React.KeyboardEvent) => {
    if (isOpen) {
      event.stopPropagation()
    }
    const itemCount = React.Children.count(children)
    if (isOpen) {
      switch (event.key) {
        case ' ':
        case 'Enter':
          // FIXME: activate link or open submenu
          break
        case 'Escape':
          setIsOpen(false)
          break
        case 'ArrowRight':
          // FIXME: If on submenu => open submenu and focus first
          // FIXME: else => close submenu and move focus to next main menubar item and open it
          break
        case 'ArrowLeft':
          if (!opensDownward) {
            setIsOpen(false)
            setFocussedItem(-1)
          }
          break

          // FIXME: Close submenu and move focus to parent
          // FIXME: If parent is main menubar => also move focus to previous and open it
          break
        case 'ArrowDown':
          setFocussedItem((focussedItem + 1) % itemCount)
          break
        case 'ArrowUp':
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
    } else {
      switch (event.key) {
        case 'Enter':
        case ' ':
          setIsOpen(true)
          setFocussedItem(0)
          break
        case 'ArrowDown':
          if (opensDownward) {
            setIsOpen(true)
            setFocussedItem(0)
          }
          break
        case 'ArrowUp':
          if (opensDownward) {
            setIsOpen(true)
            setFocussedItem(itemCount - 1)
          }
          break
        case 'ArrowRight':
          if (!opensDownward) {
            setIsOpen(true)
            setFocussedItem(0)
          }
          break
        default:
          break
      }
    }
  }

  return (
    <div
      onKeyDown={handleKey}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="label"
      role="menu"
      tabIndex={-1}>
      {(React.isValidElement(label))
        ? React.cloneElement(label, { ref, tabIndex })
        : <button type="button" tabIndex={tabIndex}>{label}</button>}
      <ul className={`submenu ${isOpen ? 'open' : 'closed'}`}>
        {React.Children.map(children, (child, index) => (
          <Item
            key={index}
            hasFocus={focussedItem === index && isOpen}
            ref={refs[index]}
            onClick={() => setFocussedItem(index)}>
            {React.isValidElement(child)
              ? (child.type === Menu)
                ? React.cloneElement(child, {
                  onClose: () => { refs[focussedItem]?.current?.focus() },
                })
                : child
              : <button type="button">{child}</button>}
          </Item>
        ))}
      </ul>
    </div>
  )
})

export default Menu
