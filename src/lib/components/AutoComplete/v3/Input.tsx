import React from 'react'
import useAutoComplete from './Context'
import { ReducerActions } from './Reducer'

export type InputProps = {
  type?: 'text',
  autoComplete?: 'off',
  'aria-autocomplete'?: 'list',
  id?: string,
  'aria-controls'?: string,
  'aria-activedescendant'?: string | null,
  value?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export type Props = {
  children?: React.ReactElement | ((props: InputProps) => React.ReactElement),
  component?: never,
  render?: never,
} | {
  children?: never,
  component?: string | React.FC<InputProps> | React.ComponentClass<InputProps>,
  render?: never,
} | {
  children?: never,
  component?: never,
  render?: React.ReactElement | ((props: InputProps) => React.ReactElement),
}

function Input({ children = null, component = null, render = null }: Props): React.ReactElement {
  const {
    currentInput, id, focussedItem, dispatch,
  } = useAutoComplete()
  function handleKeyPress(event: React.KeyboardEvent) {
    event.stopPropagation()
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        dispatch({
          type: ReducerActions.focusNext,
        })
        break
      case 'ArrowUp':
        event.preventDefault()
        dispatch({
          type: ReducerActions.focusPrevious,
        })
        break
      case 'Enter':
        event.preventDefault()
        dispatch({
          type: ReducerActions.submit,
        })
        break
      case 'Escape':
        event.preventDefault()
        dispatch({
          type: ReducerActions.closeList,
        })
        break
      default:
        dispatch({
          type: ReducerActions.setFocussed,
          index: -1,
        })
        break
    }
  }

  return (
    <div
      onFocus={() => dispatch({ type: ReducerActions.openList })}
      onBlur={() => dispatch({ type: ReducerActions.closeList })}
      onKeyDown={handleKeyPress}
      role="presentation">
      {(function renderInput() {
        let result: React.ReactElement = null
        const props = {
          type: 'text',
          autoComplete: 'off',
          'aria-autocomplete': 'list',
          id,
          'aria-controls': `${id}-options`,
          'aria-activedescendant': focussedItem !== -1 ? `${id}-options-${focussedItem}` : null,
          value: currentInput,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => (
            dispatch({
              type: ReducerActions.setCurrentInput,
              input: event.currentTarget.value,
            })
          ),
        } as const
        if (children != null) {
          if (React.isValidElement(children)) {
            result = React.cloneElement(children, props)
          } else if (typeof children === 'function') {
            result = children(props)
          } else {
            throw new Error('Invalid children type')
          }
        } else if (component != null) {
          result = React.createElement(component, props)
        } else if (render != null) {
          if (React.isValidElement(render)) {
            result = React.cloneElement(render, props)
          } else if (typeof render === 'function') {
            result = render(props)
          } else {
            throw new Error('Invalid render type')
          }
        } else {
          result = (
            <input
              type="text"
              autoComplete="off"
              aria-autocomplete="list"
              id={id}
              aria-controls={`${id}-options`}
              aria-activedescendant={focussedItem !== -1 ? `${id}-options-${focussedItem}` : null}
              value={currentInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
                dispatch({
                  type: ReducerActions.setCurrentInput,
                  input: event.currentTarget.value,
                })
              )} />
          )
        }
        return result
      }())}
    </div>
  )
}

export default Input
