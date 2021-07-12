import React, { useImperativeHandle } from 'react'
import useFocus from '../../../hooks/useFocus/useFocus'
import { FocussableElement, TextContent } from './Utils'

export type Props = {
  children: React.ReactElement,
  hasFocus?: boolean,
  tabIndex?: number,
  onClick?: (event: React.MouseEvent) => void
}

const Item = React.forwardRef<TextContent, Props>(
  ({
    children, hasFocus = false, tabIndex = -1, onClick,
  }, forwardedRef) => {
    const ref = useFocus<FocussableElement & TextContent>(hasFocus)
    useImperativeHandle(forwardedRef, () => ({
      textContent: ref?.current?.textContent,
    }))
    return (
    // onClick is used as a pass-through from the click on the link
    // as long as the link does not have a stopPropagation on click
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
      <li onClick={onClick} role="none">
        {React.cloneElement(children, { ref, tabIndex, role: 'menuitem' })}
      </li>
    )
  },
)

export default Item
