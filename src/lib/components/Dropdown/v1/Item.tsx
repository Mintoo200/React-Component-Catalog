import React from 'react'
import useFocus from '../../../hooks/useFocus/useFocus'

export type Props = {
  children: React.ReactElement,
  hasFocus: boolean
}

const Item = React.forwardRef<HTMLElement, Props>(({ children, hasFocus }, ref) => {
  if (typeof ref === 'function') {
    throw new Error('Item component only support MutableRefs, not ref callbacks.')
  }
  useFocus<HTMLElement>(hasFocus, ref)
  return (
    <li>
      {React.cloneElement(children, { ref, tabIndex: hasFocus ? 0 : -1 })}
    </li>
  )
})

export default Item
