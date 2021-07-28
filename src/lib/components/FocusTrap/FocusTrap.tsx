import React, { useEffect, useRef, useState } from 'react'

interface Parent {
  children: HTMLCollection,
}

type StateElement = {
  target: Node,
  value: number,
}

type Props = {
  children: React.ReactNode,
  active?: boolean,
}

function isFocussable(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tabIndex >= 0
}

function extractFocussableNodes(
  root: Parent,
  ignoreNode: Element,
  result: StateElement[] = [],
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

export default function FocusTrap({ children, active = false }: Props): React.ReactElement {
  const ref = useRef(null)
  const [outsideElements, setOutsideElements] = useState([])
  useEffect(() => {
    const elements = extractFocussableNodes(document, ref?.current)
    setOutsideElements(elements)
  }, [ref, setOutsideElements])
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
  return <div ref={ref}>{children}</div>
}
