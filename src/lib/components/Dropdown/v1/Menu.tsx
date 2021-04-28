import React, {
  RefObject, useEffect, useReducer, useState,
} from 'react'
import InvalidActionError from '../../../errors/InvalidActionError'
import useCombinedRef from '../../../hooks/useCombinedRef/useCombinedRef'
import Item from './Item'
import { findNextMatching, isCharacter } from './Utils'

enum Actions {
  setRefs,
  setIsOpen,
  closeMenu,
  openMenu,
  setFocussedItem,
  focusFirst,
  focusLast,
  focusNext,
  focusPrevious,
  focusMatching,
}

type Action = {
  type: Actions.setRefs,
  refs: RefObject<HTMLElement>[],
} | {
  type: Actions.setIsOpen,
  isOpen: boolean,
} | {
  type: Actions.setFocussedItem,
  index: number,
} | {
  type: Actions.focusMatching,
  match: string
} | {
  type: Actions.closeMenu
  | Actions.openMenu
  | Actions.focusFirst
  | Actions.focusLast
  | Actions.focusNext
  | Actions.focusPrevious,
  isOpen?: never,
  index?: never,
  refs?: never,
  match?: never
}

type State = {
  isOpen: boolean,
  focussedItem: number,
  refs: RefObject<HTMLElement>[],
}

function Reducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.setRefs:
      return {
        ...state,
        refs: action.refs,
      }
    case Actions.setIsOpen:
      return {
        ...state,
        isOpen: action.isOpen,
        focussedItem: (action.isOpen) ? state.focussedItem : -1,
      }
    case Actions.closeMenu:
      return {
        ...state,
        isOpen: false,
        focussedItem: -1,
      }
    case Actions.openMenu:
      return {
        ...state,
        isOpen: true,
      }
    case Actions.setFocussedItem:
      return {
        ...state,
        focussedItem: action.index,
      }
    case Actions.focusFirst:
      return {
        ...state,
        focussedItem: 0,
      }
    case Actions.focusLast:
      return {
        ...state,
        focussedItem: state.refs.length - 1,
      }
    case Actions.focusNext:
      return {
        ...state,
        focussedItem: (state.focussedItem + 1) % state.refs.length,
      }
    case Actions.focusPrevious:
      return {
        ...state,
        focussedItem: (state.focussedItem - 1 + state.refs.length) % state.refs.length,
      }
    case Actions.focusMatching: {
      if (!isCharacter(action.match)) {
        break
      }
      if (state.isOpen && state.focussedItem !== -1) {
        const newIndex = findNextMatching(state.refs, action.match, state.focussedItem)
        if (newIndex === -1) {
          break
        }
        return {
          ...state,
          focussedItem: newIndex,
        }
      }
      break
    }
    default:
      throw new InvalidActionError()
  }
  return state
}

export type Props = {
  children: React.ReactNode,
  label: React.ReactNode | ((props: LabelProps<HTMLElement>) => React.ReactElement),
  tabIndex?: number,
  onClose?: () => void,
  opensDownward?: boolean,
  openNextSibling?: () => void,
  openPreviousSibling?: () => void,
  open?: boolean
}

export type LabelProps<T> = {
  ref: React.ForwardedRef<T>,
  tabIndex: number,
  'aria-haspopup': boolean | 'dialog' | 'menu' | 'false' | 'true' | 'listbox' | 'tree' | 'grid',
  'aria-expanded': boolean | 'false' | 'true',
  role: string,
}

const Menu = React.forwardRef<HTMLButtonElement, Props>(({
  children,
  label,
  tabIndex = -1,
  onClose = () => null,
  opensDownward = false,
  openNextSibling = () => null,
  openPreviousSibling = () => null,
  open = false,
}, forwardedRef) => {
  const [{ isOpen, focussedItem, refs }, dispatch] = useReducer(Reducer, {
    isOpen: open,
    focussedItem: -1,
    refs: [],
  })
  const [ariaLabel, setAriaLabel] = useState('')
  const ref = useCombinedRef(forwardedRef)
  useEffect(() => {
    setAriaLabel(ref?.current?.textContent)
  }, [ref?.current?.textContent])
  useEffect(() => {
    if (!open || opensDownward) {
      dispatch({
        type: Actions.setIsOpen,
        isOpen: open,
      })
    }
  }, [open])
  useEffect(() => {
    dispatch({
      type: Actions.setRefs,
      refs: React.Children.map(children, () => React.createRef<HTMLElement>()),
    })
  }, [children])
  useEffect(() => {
    if (!isOpen) {
      // call onClose when closing
      onClose()
    }
  }, [isOpen])

  const handleKey = (event: React.KeyboardEvent) => {
    let shouldStopPropagation = true
    let shouldPreventDefault = true
    if (isOpen && focussedItem !== -1) {
      switch (event.key) {
        case 'Escape':
          if (opensDownward) {
            shouldStopPropagation = false
          }
          dispatch({ type: Actions.closeMenu })
          break
        case 'ArrowRight': {
          const child = React.Children.toArray(children)[focussedItem]
          if (!React.isValidElement(child) || child.type !== Menu) {
            dispatch({ type: Actions.closeMenu })
            openNextSibling()
          }
          break
        }
        case 'ArrowLeft':
          dispatch({ type: Actions.closeMenu })
          if (opensDownward) {
            openPreviousSibling()
          }
          break
        case 'ArrowDown':
          dispatch({ type: Actions.focusNext })
          break
        case 'ArrowUp':
          dispatch({ type: Actions.focusPrevious })
          break
        case 'Home':
          dispatch({ type: Actions.focusFirst })
          break
        case 'End':
          dispatch({ type: Actions.focusLast })
          break
        default: {
          if (!isCharacter(event.key)) {
            shouldPreventDefault = false
          }
          dispatch({ type: Actions.focusMatching, match: event.key })
          break
        }
      }
    } else {
      switch (event.key) {
        case 'Enter':
        case ' ':
          dispatch({ type: Actions.openMenu })
          dispatch({ type: Actions.focusFirst })
          break
        case 'ArrowDown':
          if (opensDownward) {
            dispatch({ type: Actions.openMenu })
            dispatch({ type: Actions.focusFirst })
          } else {
            shouldStopPropagation = false
          }
          break
        case 'ArrowUp':
          if (opensDownward) {
            dispatch({ type: Actions.openMenu })
            dispatch({ type: Actions.focusLast })
          } else {
            shouldStopPropagation = false
          }
          break
        case 'ArrowRight':
          if (!opensDownward) {
            dispatch({ type: Actions.openMenu })
            dispatch({ type: Actions.focusFirst })
          } else {
            shouldStopPropagation = false
          }
          break
        default:
          shouldPreventDefault = false
          shouldStopPropagation = false
          break
      }
    }
    if (shouldPreventDefault) {
      event.preventDefault()
    }
    if (shouldStopPropagation) {
      event.stopPropagation()
    }
  }

  return (
    <div
      onKeyDown={handleKey}
      onMouseEnter={() => dispatch({ type: Actions.openMenu })}
      onMouseLeave={() => { dispatch({ type: Actions.closeMenu }) }}
      className="label"
      role="presentation">
      {(() => {
        let result: React.ReactElement
        if (React.isValidElement(label)) {
          result = React.cloneElement(label, {
            ref,
            tabIndex,
            'aria-haspopup': 'menu',
            'aria-expanded': isOpen,
            role: 'menuitem',
          })
        } else if (typeof label === 'function') {
          result = label({
            ref,
            tabIndex,
            'aria-haspopup': 'menu',
            'aria-expanded': isOpen,
            role: 'menuitem',
          })
        } else {
          result = (
            <button type="button" tabIndex={tabIndex} role="menuitem" aria-haspopup="menu" aria-expanded={isOpen} ref={ref}>
              {label}
            </button>
          )
        }
        return result
      })()}
      <ul
        className={`submenu ${isOpen ? 'open' : 'closed'}`}
        role="menu"
        aria-label={ariaLabel}>
        {React.Children.map(children, (child, index) => (
          <Item
            key={index}
            hasFocus={focussedItem === index && isOpen}
            ref={refs[index]}
            onClick={() => dispatch({ type: Actions.setFocussedItem, index })}>
            {React.isValidElement(child)
              ? (child.type === Menu)
                ? React.cloneElement(child, {
                  onClose: () => { refs[focussedItem]?.current?.focus() },
                  openNextSibling: () => {
                    dispatch({ type: Actions.closeMenu })
                    openNextSibling()
                  },
                  openPreviousSibling: () => {
                    dispatch({ type: Actions.closeMenu })
                    openPreviousSibling()
                  },
                  open: isOpen,
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
