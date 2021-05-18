import React from 'react'

export type Props = {
  children?: React.ReactNode,
  value?: string,
  onClick?: () => void,
  hidden?: boolean,
  focussed?: boolean,
  onHover?: () => void,
}

function Option({
  children = null, value = null, onClick, hidden = false, focussed = false, onHover,
}: Props): React.ReactElement {
  return (
    <li className={`option ${hidden ? 'hidden' : ''} ${focussed ? 'focussed' : ''}`} onMouseEnter={onHover}>
      <button
        type="button"
      // MouseDown fires before focus loss
        onMouseDown={onClick}>
        {children ?? value}
      </button>
    </li>
  )
}

export default Option
