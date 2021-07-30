import { useEffect, useLayoutEffect, useState } from 'react'

export default function useFocusRestore(restore = false): boolean {
  const [lastFocussedElement, setLastFocussedElement] = useState<HTMLElement>(null)
  // getting the current active element here to make sure it runs before
  // any layout effect that would focus another element
  const currentFocus = document.activeElement
  useLayoutEffect(() => {
    if (restore && lastFocussedElement != null) {
      lastFocussedElement.focus()
    }
  }, [restore])
  useEffect(() => {
    if (!restore && currentFocus instanceof HTMLElement) {
      setLastFocussedElement(currentFocus)
    }
  }, [restore, setLastFocussedElement])
  return restore
}
