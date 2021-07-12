import React, { useLayoutEffect, useRef } from 'react'

export type FocussableElement = {
  focus: (options?: FocusOptions) => void
}

export default function useFocus<T extends FocussableElement>(
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
