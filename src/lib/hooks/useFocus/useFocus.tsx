import React, { useEffect, useRef } from 'react'

export default function useFocus<T extends HTMLElement>(
  hasFocus: boolean,
  ref: React.MutableRefObject<T> = useRef<T>(),
)
: React.MutableRefObject<T> {
  useEffect(() => {
    if (hasFocus) {
      ref?.current?.focus()
    }
  }, [ref, hasFocus])
  return ref
}
