import React, {
  RefObject, useEffect, useLayoutEffect, useState,
} from 'react'
import useAutoComplete from './Context'
import Option, { OptionRef } from './Option'
import { ReducerActions } from './Reducer'

export type Props = {
  children: React.ReactNode,
}

function isOption(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === Option
}

function Options({ children }: Props): React.ReactElement {
  const {
    currentInput, dispatch, isOpen, focussedItem, id, 'aria-labelledby': labeledby,
  } = useAutoComplete()
  const [refs, setRefs] = useState<RefObject<OptionRef>[]>([])
  useLayoutEffect(() => {
    // using layout effect to ensure refs up to date before any effect call
    const newRefs: RefObject<OptionRef>[] = []
    React.Children.forEach(children, (child) => {
      if (isOption(child)) {
        newRefs.push(React.createRef<OptionRef>())
      }
    })
    setRefs(newRefs)
  }, [children])
  useEffect(() => {
    dispatch({
      type: ReducerActions.setOptions,
      options: refs,
    })
  }, [refs])
  let itemIndex = -1
  return (
    <ul
      className={`options ${isOpen ? '' : 'hidden'}`}
      id={`${id}-options`}
      role="listbox"
      aria-labelledby={labeledby}
      aria-live="polite">
      {React.Children.map(children, (child, index) => {
        if (isOption(child)) {
          if (refs[index]?.current?.match(currentInput)) {
            itemIndex += 1
            // action needs to be set here for closure
            const indexCopy = itemIndex
            return React.cloneElement(child, {
              focussed: focussedItem === itemIndex,
              onClick: () => (
                dispatch({
                  type: ReducerActions.submit,
                })
              ),
              onHover: () => (
                dispatch({
                  type: ReducerActions.setFocussed,
                  index: indexCopy,
                })
              ),
              onUnHover: () => (
                dispatch({
                  type: ReducerActions.setFocussed,
                  index: -1,
                })
              ),
              id: `${id}-options-${itemIndex}`,
              ref: refs[index],
            })
          }
          return React.cloneElement(child, {
            hidden: true,
            ref: refs[index],
          })
        }
        return child
      })}
    </ul>
  )
}

export default Options
