import React from 'react'
import useFocus from '../../../hooks/useFocus/useFocus'

export type Props = {
  children: React.ReactElement,
  hasFocus?: boolean,
  onClick?: (event: React.MouseEvent) => void
}

const Item = React.forwardRef<HTMLElement, Props>(
  ({ children, hasFocus = false, onClick }, ref) => {
    if (typeof ref === 'function') {
      throw new Error('Item component only support MutableRefs, not ref callbacks.')
    }
    useFocus<HTMLElement>(hasFocus, ref)
    return (
    // onClick is used as a pass-through from the click on the link
    // as long as the link does not have a stopPropagation on click
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
      <li onClick={onClick}>
        {React.cloneElement(children, { ref, tabIndex: hasFocus ? 0 : -1 })}
      </li>
    )
  },
)

export default Item
