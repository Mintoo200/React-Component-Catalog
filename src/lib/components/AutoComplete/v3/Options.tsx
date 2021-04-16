import React, { useContext, useEffect } from 'react'
import Context from './Context'
import Option from './Option'
import { ReducerActions } from './Reducer'

export type Props = {
  children: React.ReactNode,
}

const isOption = (node: React.ReactNode): node is React.ReactElement => (
  React.isValidElement(node) && node.type === Option
)

const match = (option: string, input: string) => (
  option.toLowerCase().includes(input.toLowerCase())
)

const valueMatch = (node: React.ReactElement, input: string) => (
  node.props.value && match(node.props.value, input)
)

const childrenMatch = (node: React.ReactElement, input: string) => (
  node.props.children
  && (typeof node.props.children === 'string'
    && match(node.props.children as string, input))
)

const Options = ({ children }: Props): React.ReactElement => {
  const {
    currentInput, dispatch, hasFocus, focussedItem,
  } = useContext(Context)
  useEffect(() => {
    const options = [] as string[]
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
    <ol className={`options ${hasFocus ? '' : 'hidden'}`}>
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
            })
          }
          return React.cloneElement(child, {
            hidden: true,
          })
        }
        return child
      })}
    </ol>
  )
}

export default Options
