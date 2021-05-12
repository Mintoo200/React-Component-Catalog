import React, { useEffect, useState } from 'react'
import makeCancelable from '../../../CancelablePromise'
import CanceledError from '../../../errors/CanceledError'
import useSalt from '../useSalt'

export type Option = {
  value: string,
  label?: string,
}

export type Props = {
  getOptions: (input: string) => Promise<Option[]>,
  onSubmit: (input: string) => void,
}

const AutoComplete = ({ getOptions, onSubmit }: Props): React.ReactElement => {
  const salt = useSalt()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  useEffect(() => {
    const cancelable = makeCancelable(getOptions(inputValue))
    cancelable.promise.then(setOptions)
      .catch((error: Error) => {
        if (!(error instanceof CanceledError)) {
          throw error
        }
      })
    return () => cancelable.cancel()
  }, [inputValue])
  return (
    <>
      <datalist id={`data-${salt}`}>
        {options.map(({ value, label }: Option, index:number) => (
          <option value={value} label={label} key={index} />
        ))}
      </datalist>
      <input
        list={`data-${salt}`}
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
          setInputValue(event.currentTarget.value)
        )}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onSubmit(event.currentTarget.value)
          }
        }} />
    </>
  )
}

export default AutoComplete
