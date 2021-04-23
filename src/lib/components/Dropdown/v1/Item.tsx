import React from 'react'
import useFocus from '../../../hooks/useFocus/useFocus'

export type Props = {
  children: React.ReactElement,
  hasFocus?: boolean,
  tabIndex?: number,
  onClick?: (event: React.MouseEvent) => void
}

const Item = React.forwardRef<HTMLElement, Props>(
  ({
    children, hasFocus = false, tabIndex = -1, onClick,
  }, ref) => {
    if (typeof ref === 'function') {
      throw new Error('Item component only support RefObjects, not ref callbacks.')
    }
    useFocus<HTMLElement>(hasFocus, ref)
    return (
    // onClick is used as a pass-through from the click on the link
    // as long as the link does not have a stopPropagation on click
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
      <li onClick={onClick} role="none">
        {React.cloneElement(children, { ref, tabIndex })}
      </li>
    )
  },
)

export default Item
