import React, { useImperativeHandle, useRef } from 'react'

export type Props = {
  children?: React.ReactNode,
  value?: string,
  onClick?: () => void,
  hidden?: boolean,
  focussed?: boolean,
  onHover?: () => void,
  id?: string,
}

export type OptionRef = {
  match: (matcher: string) => boolean,
  value: string,
}

const Option = React.forwardRef<OptionRef, Props>(({
  children = null, value = null, onClick, hidden = false, focussed = false, onHover, id = null,
}, forwardedRef) => {
  const ref = useRef<HTMLLIElement>()
  useImperativeHandle(forwardedRef, () => ({
    match: (matcher) => (
      ref?.current?.textContent.toLowerCase().includes(matcher.toLowerCase())
      || value?.toLowerCase().includes(matcher.toLowerCase())
    ),
    value: value ?? ref?.current?.textContent,
  }))
  return (
    <li
      className={`option ${hidden ? 'hidden' : ''} ${focussed ? 'focussed' : ''}`}
      onMouseEnter={onHover}
      id={id}
      aria-selected={focussed}
      role="option"
      ref={ref}>
      <button
        type="button"
      // MouseDown fires before focus loss
        onMouseDown={onClick}>
        {children ?? value}
      </button>
    </li>
  )
})

export default Option
