import React, { useEffect, useRef } from 'react'

export default function useFocus<T extends HTMLElement>(hasFocus: boolean)
: React.MutableRefObject<T> {
  const ref = useRef<T>()
  useEffect(() => {
    if (hasFocus) {
      ref?.current?.focus()
    }
  }, [ref, hasFocus])
  return ref
}
