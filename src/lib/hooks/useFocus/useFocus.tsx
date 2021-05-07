import React, { useLayoutEffect, useRef } from 'react'

export default function useFocus<T extends HTMLElement>(
  hasFocus: boolean,
  ref: React.MutableRefObject<T> = useRef<T>(),
)
: React.MutableRefObject<T> {
  useLayoutEffect(() => {
    if (hasFocus) {
      ref?.current?.focus()
    }
  }, [ref, hasFocus])
  return ref
}
