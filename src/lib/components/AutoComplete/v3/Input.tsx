import React from 'react'
import useAutoComplete from './Context'
import { ReducerActions } from './Reducer'

export type Props = {
  children?: React.ReactElement
}

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

function Input({ children = null }: Props): React.ReactElement {
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
        if (children != null) {
          return React.cloneElement(children, {
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
          })
        }
        return (
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
      }())}
    </div>
  )
}

export default Input
