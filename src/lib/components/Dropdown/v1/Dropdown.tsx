import React, {
  RefObject, useEffect, useReducer,
} from 'react'
import Item from './Item'
import Menu from './Menu'
import InvalidActionError from '../../../errors/InvalidActionError'
import {
  findNextMatching, isCharacter,
} from './Utils'

import '../style.css'

enum Actions {
  setRefs,
  focusNext,
  focusPrevious,
  closeMenu,
  focusFirst,
  focusLast,
  focusMatching,
  setFocussedItem,
  focusNextSibling,
  focusPreviousSibling,
}

type Action = {
  type: Actions.setRefs,
  refs: RefObject<HTMLElement>[],
} | {
  type: Actions.setFocussedItem,
  index: number,
} | {
  type: Actions.focusMatching,
  match: string
} | {
  type: Actions.closeMenu
  | Actions.focusFirst
  | Actions.focusLast
  | Actions.focusNext
  | Actions.focusNextSibling
  | Actions.focusPreviousSibling
  | Actions.focusPrevious,
  isOpen?: never,
  index?: never,
  refs?: never,
  match?: never
}

type State = {
  openMenu: boolean,
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
    case Actions.closeMenu:
      return {
        ...state,
        openMenu: false,
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
      const newIndex = findNextMatching(state.refs, action.match, state.focussedItem)
      if (newIndex === -1) {
        break
      }
      return {
        ...state,
        focussedItem: newIndex,
      }
    }
    case Actions.focusPreviousSibling:
      return {
        ...state,
        openMenu: true,
        focussedItem: (state.focussedItem - 1 + state.refs.length) % state.refs.length,
      }
    case Actions.focusNextSibling:
      return {
        ...state,
        openMenu: true,
        focussedItem: (state.focussedItem + 1) % state.refs.length,
      }
    default:
      throw new InvalidActionError()
  }
  return state
}

export type Props = {
  children: React.ReactNode,
  'aria-label': string,
}

const Dropdown = ({ children, ...a11y }: Props): React.ReactElement => {
  const [{ focussedItem, refs, openMenu }, dispatch] = useReducer(Reducer, {
    focussedItem: 0,
    refs: [],
    openMenu: false,
  })
  useEffect(() => {
    dispatch({
      type: Actions.setRefs,
      refs: React.Children.map(children, () => React.createRef<HTMLElement>()),
    })
  }, [children])
  const handleKey = (event: React.KeyboardEvent) => {
    event.stopPropagation()
    event.preventDefault()
    switch (event.key) {
      case 'Escape':
        dispatch({ type: Actions.closeMenu })
        break
      case 'ArrowRight':
        dispatch({ type: Actions.focusNext })
        break
      case 'ArrowLeft':
        dispatch({ type: Actions.focusPrevious })
        break
      case 'Home':
        dispatch({ type: Actions.focusFirst })
        break
      case 'End':
        dispatch({ type: Actions.focusLast })
        break
      default:
        dispatch({ type: Actions.focusMatching, match: event.key })
    }
  }
  return (
    <ul
      className="dropdown"
      onKeyDown={handleKey}
      role="menubar"
      aria-label={a11y['aria-label']}>
      {React.Children.map(children, (child, index) => (
        <Item
          key={index}
          hasFocus={focussedItem === index}
          tabIndex={focussedItem === index ? 0 : -1}
          ref={refs[index]}
          onClick={() => { dispatch({ type: Actions.setFocussedItem, index }) }}>
          {React.isValidElement(child)
            ? (child.type === Menu)
              ? React.cloneElement(child, {
                onClose: () => { refs[focussedItem]?.current?.focus() },
                opensDownward: true,
                openNextSibling: () => { dispatch({ type: Actions.focusNextSibling }) },
                openPreviousSibling: () => { dispatch({ type: Actions.focusPreviousSibling }) },
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
