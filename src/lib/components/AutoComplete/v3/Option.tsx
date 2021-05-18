import React from 'react'

export type Props = {
  children?: React.ReactNode,
  value?: string,
  onClick?: () => void,
  hidden?: boolean,
  focussed?: boolean,
  onHover?: () => void,
  id?: string,
}

function Option({
  children = null, value = null, onClick, hidden = false, focussed = false, onHover, id = '',
}: Props): React.ReactElement {
  return (
    <li
      className={`option ${hidden ? 'hidden' : ''} ${focussed ? 'focussed' : ''}`}
      onMouseEnter={onHover}
      id={id}>
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
