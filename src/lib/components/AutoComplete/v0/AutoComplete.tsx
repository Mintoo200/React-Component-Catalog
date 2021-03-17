import React from 'react'
import useSalt from '../useSalt'

export type Option = {
  value: string,
  label?: string,
}

export type Props = {
  options: Option[],
}

const AutoComplete: React.FC<Props> = ({ options }) => {
  const salt = useSalt()
  return (
    <>
      <datalist id={`data-${salt}`}>
        {options.map(({ value, label }: Option, index:number) => (
          <option value={value} label={label} key={index} />
        ))}
      </datalist>
      <input list={`data-${salt}`} />
    </>
  )
}

export default AutoComplete
