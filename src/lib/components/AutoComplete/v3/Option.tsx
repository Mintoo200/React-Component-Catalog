import React, { useImperativeHandle, useRef } from 'react'

export type Props = {
  children?: React.ReactNode,
  value?: string | unknown,
  onClick?: () => void,
  hidden?: boolean,
  focussed?: boolean,
  onHover?: () => void,
  onUnHover?: () => void,
  id?: string,
}

export type OptionRef = {
  match: (matcher: string) => boolean,
  value: string | unknown,
  textValue: string,
}

const Option = React.forwardRef<OptionRef, Props>(({
  children = null,
  value = null,
  onClick,
  hidden = false,
  focussed = false,
  onHover,
  onUnHover,
  id = null,
}, forwardedRef) => {
  const ref = useRef<HTMLLIElement>()
  useImperativeHandle(forwardedRef, () => ({
    match: (matcher) => (
      ref?.current?.textContent.toLowerCase().includes(matcher.toLowerCase())
      || (typeof value === 'string' && value?.toLowerCase().includes(matcher.toLowerCase()))
    ),
    value: value ?? ref?.current?.textContent,
    textValue: value != null && typeof value === 'string' ? value : ref?.current?.textContent,
  }))
  return (
    <li
      className={`option ${hidden ? 'hidden' : ''} ${focussed ? 'focussed' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
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
