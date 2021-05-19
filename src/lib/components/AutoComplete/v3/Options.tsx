import React, { useEffect } from 'react'
import useAutoComplete from './Context'
import Option from './Option'
import { ReducerActions } from './Reducer'

export type Props = {
  children: React.ReactNode,
}

function isOption(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === Option
}

function match(option: string, input: string) {
  return option.toLowerCase().includes(input.toLowerCase())
}

function valueMatch(node: React.ReactElement, input: string) {
  return node.props.value && match(node.props.value, input)
}

function childrenMatch(node: React.ReactElement, input: string) {
  return (
    node.props.children
    && typeof node.props.children === 'string'
    && match(node.props.children, input)
  )
}

function Options({ children }: Props): React.ReactElement {
  const {
    currentInput, dispatch, isOpen, focussedItem, id, 'aria-labelledby': labeledby,
  } = useAutoComplete()
  useEffect(() => {
    const options: string[] = []
    React.Children.forEach(children, (child) => {
      if (isOption(child)) {
        if (valueMatch(child, currentInput)
        || childrenMatch(child, currentInput)) {
          options.push(child.props.value ?? child.props.children)
        }
      }
    })
    dispatch({
      type: ReducerActions.setOptions,
      options,
    })
  }, [children, currentInput])
  let itemIndex = -1
  return (
    <ul
      className={`options ${isOpen ? '' : 'hidden'}`}
      id={`${id}-options`}
      role="listbox"
      aria-labelledby={labeledby}
      aria-live="polite">
      {React.Children.map(children, (child) => {
        if (isOption(child)) {
          if (valueMatch(child, currentInput)
          || childrenMatch(child, currentInput)) {
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
              id: `${id}-options-${itemIndex}`,
            })
          }
          return React.cloneElement(child, {
            hidden: true,
          })
        }
        return child
      })}
    </ul>
  )
}

export default Options
