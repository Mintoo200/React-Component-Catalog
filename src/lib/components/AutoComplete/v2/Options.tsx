import React, { useContext } from 'react'
import Context from './Context'
import Option from './Option'

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

const Options: React.FC<Props> = ({ children }) => {
  const { currentInput, onSubmit, hasFocus } = useContext(Context)
  return (
    <ol className={`options ${hasFocus ? '' : 'hidden'}`}>
      {React.Children.map(children, (child) => (
        // is an option but does not match the input
        (isOption(child))
          ? (valueMatch(child, currentInput)
            || childrenMatch(child, currentInput))
            ? React.cloneElement(child, {
              onClick: () => {
                onSubmit(child.props.value ?? child.props.children)
              },
            })
            : React.cloneElement(child, {
              hidden: true,
            })
          : child
      ))}
    </ol>
  )
}

export default Options
