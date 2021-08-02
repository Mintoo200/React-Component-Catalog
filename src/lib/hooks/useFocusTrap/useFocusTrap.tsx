import {
  RefObject, useEffect, useRef, useState,
} from 'react'

type FocussableListNode = {
  target: HTMLElement,
  value: number,
}

function isFocussable(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tabIndex >= 0
}

function extractFocussableNodes(
  root: Element | Document,
  ignoreNode: Element,
  result: FocussableListNode[] = [],
) {
  Array.from(root.children).forEach((child) => {
    if (ignoreNode === child) {
      return null
    }
    if (isFocussable(child)) {
      result.push({
        target: child,
        value: child.tabIndex,
      })
    }
    if (child.children.length > 0) {
      return extractFocussableNodes(child, ignoreNode, result)
    }
    return result
  })
  return result
}

export default function useFocusTrap<T extends HTMLElement>(
  active = false,
  providedRef?: RefObject<T>,
): RefObject<T> {
  const ref = useRef<T>()
  const resultingRef = providedRef ?? ref
  const [outsideElements, setOutsideElements] = useState<FocussableListNode[]>([])
  useEffect(() => {
    const elements = extractFocussableNodes(document, resultingRef?.current)
    setOutsideElements(elements)
  }, [resultingRef, setOutsideElements])
  useEffect(() => {
    if (active) {
      outsideElements.forEach(({ target }) => {
        target.tabIndex = -1
      })
    } else {
      outsideElements.forEach(({ target, value }) => {
        target.tabIndex = value
      })
    }
  }, [active, outsideElements])
  return resultingRef
}
