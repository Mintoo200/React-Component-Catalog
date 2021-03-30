import React from 'react'
import useSalt from '../useSalt'

export type Option = {
  value: string,
  label?: string,
}

export type Props = {
  options: Option[],
  onSubmit: (input: string) => void,
}

const AutoComplete = ({ options, onSubmit }: Props): React.ReactElement => {
  const salt = useSalt()
  return (
    <>
      <datalist id={`data-${salt}`}>
        {options.map(({ value, label }: Option, index:number) => (
          <option
            value={value}
            label={label}
            key={index} />
        ))}
      </datalist>
      <input
        list={`data-${salt}`}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onSubmit(event.currentTarget.value)
          }
        }} />
    </>
  )
}

export default AutoComplete
