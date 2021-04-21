import React from 'react'
import useFocus from '../../../hooks/useFocus/useFocus'

export type Props = {
  children: React.ReactElement,
  hasFocus: boolean
}

const Item: React.FC<Props> = ({ children, hasFocus }) => {
  const ref = useFocus<HTMLElement>(hasFocus)
  return (
    <li>
      {React.cloneElement(children, { ref })}
    </li>
  )
}

export default Item
