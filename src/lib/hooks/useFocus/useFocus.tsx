import React, { useEffect, useRef } from 'react'

export default function useFocus<T extends HTMLElement>(
  hasFocus: boolean,
  ref: React.ForwardedRef<T> = useRef<T>(),
)
: React.ForwardedRef<T> {
  useEffect(() => {
    if (hasFocus && typeof ref !== 'function') {
      ref?.current?.focus()
    }
  }, [ref, hasFocus])
  return ref
}
