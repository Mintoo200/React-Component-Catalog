import React from 'react'

export type Props = {
  children?: React.ReactNode,
  value?: string,
  onClick?: () => void,
  hidden?: boolean,
}

const Option: React.FC<Props> = ({
  children = null, value = null, onClick, hidden = false,
}) => (
  <li className={`option ${hidden ? 'hidden' : ''}`}>
    <button
      type="button"
      // MouseDown fires before focus loss
      onMouseDown={onClick}>
      {children ?? value}
    </button>
  </li>
)

export default Option
