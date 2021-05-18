import React, { useReducer } from 'react'
import useID from '../../../hooks/useID/useID'
import { Context } from './Context'
import Reducer from './Reducer'

import './style.css'

export type Props = {
  children: React.ReactNode,
  onSubmit: (value: string) => void,
}

function AutoComplete({ children, onSubmit }: Props): React.ReactElement {
  const id = useID()
  const [state, dispatch] = useReducer(Reducer, {
    currentInput: '',
    hasFocus: false,
    onSubmit,
    focussedItem: -1,
    options: [],
  })
  return (
    <Context.Provider value={{
      ...state,
      id,
      dispatch,
    }}>
      <div
        className="autocomplete"
        aria-expanded={state.hasFocus}
        aria-haspopup="listbox"
        aria-owns={`autocomplete-${id}-options`}
        /* FIXME: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/789 */
        /* eslint-disable-next-line jsx-a11y/role-has-required-aria-props */
        role="combobox">
        {children}
      </div>
    </Context.Provider>
  )
}

export default AutoComplete
