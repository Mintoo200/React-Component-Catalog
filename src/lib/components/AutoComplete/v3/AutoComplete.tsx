import React, { useEffect, useReducer } from 'react'
import { Context } from './Context'
import Input from './Input'
import Reducer from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
  id: string,
  'aria-labelledby': string,
  onChange?: (value: string) => void,
}

function AutoComplete({
  children, onSubmit, id, 'aria-labelledby': labelledby, onChange = () => null,
}: Props): React.ReactElement {
  const [state, dispatch] = useReducer(Reducer, {
    currentInput: '',
    isOpen: false,
    onSubmit,
    focussedItem: -1,
    options: [],
  })
  useEffect(() => {
    onChange(state.currentInput)
  }, [state.currentInput])
  const childrenContainInput = React.Children
    .toArray(children)
    .some((child) => React.isValidElement(child) && child.type === Input)
  return (
    <Context.Provider value={{
      ...state,
      id,
      'aria-labelledby': labelledby,
      dispatch,
    }}>
      <div
        className="autocomplete"
        aria-expanded={state.isOpen}
        aria-haspopup="listbox"
        aria-owns={`${id}-options`}
        /* FIXME: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/789 */
        /* eslint-disable-next-line jsx-a11y/role-has-required-aria-props */
        role="combobox">
        {childrenContainInput || <Input />}
        {children}
      </div>
    </Context.Provider>
  )
}

export default AutoComplete
