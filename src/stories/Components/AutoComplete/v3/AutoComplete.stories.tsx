import React, { useEffect, useState } from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v3/AutoComplete'
import Input from '../../../../lib/components/AutoComplete/v3/Input'
import Options from '../../../../lib/components/AutoComplete/v3/Options'
import Option from '../../../../lib/components/AutoComplete/v3/Option'
import documentation from './AutoComplete.doc'

import './style.css'

export default {
  title: 'Components/AutoComplete/v3 ⭐ ♿ - Option list without datalist',
  component: AutoComplete,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FAutoComplete%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FContext%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FInput%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FOption%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FOptions%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2FReducer%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv3%2Fstyle%2Ecss/raw?ref=master',
      ],
      language: 'javascript',
    },
    docs: {
      description: {
        component: documentation,
      },
    },
  },
}

type Country = { code: string, name: string }
const countries = [
  { code: 'FR', name: 'France' },
  { code: 'CA', name: 'Canada' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'EN', name: 'England' },
  { code: 'SP', name: 'Spain' },
  { code: 'FI', name: 'Finland' },
]

const Template: Story<AutoCompleteProps> = ({ id, ...args }) => (
  <>
    <label id={`${id}-label`} htmlFor={id}>Select a country</label>
    <AutoComplete {...args} id={id} aria-labelledby={`${id}-label`} />
  </>
)

export const Default = Template.bind({})
Default.args = {
  id: 'country-selector-0',
  children: [
    <Input />,
    <Options>
      {countries.map((country) => (
        <Option value={country.code}>{country.name}</Option>
      ))}
    </Options>,
  ],
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(`submitted country with code ${input}`),
}

const AsyncTemplate: Story<AutoCompleteProps> = ({ id, ...args }) => {
  const [options, setOptions] = useState<Country[]>([])
  const [input, setInput] = useState('')
  useEffect(() => {
    setOptions([])
    const timeout = setTimeout(() => (
      setOptions(countries.filter((country) => (
        country.name.includes(input) || country.code.includes(input)
      )))
    ), 2000)
    return () => clearTimeout(timeout)
  }, [input])
  return (
    <>
      <label id={`${id}-label`} htmlFor={id}>Select a country</label>
      <AutoComplete {...args} id={id} aria-labelledby={`${id}-label`} onChange={setInput}>
        <Input />
        <Options>
          {(() => {
            if (options.length > 0) {
              return options.map((option: Country) => (
                <Option key={option.code} value={option.code}>{option.name}</Option>
              ))
            }
            return <div className="loading">Loading...</div>
          })()}
        </Options>
      </AutoComplete>
    </>
  )
}

export const Async = AsyncTemplate.bind({})
Async.args = {
  id: 'country-selector-1',
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(`submitted country with code ${input}`),
}

export const WithObjectValues = Template.bind({})
WithObjectValues.args = {
  id: 'country-selector-2',
  children: [
    <Input />,
    <Options>
      {countries.map((country) => (
        <Option value={country}>{country.name}</Option>
      ))}
    </Options>,
  ],
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(
    typeof input === 'string'
      ? `submitted direct input: ${input}`
      : `submitted country ${JSON.stringify(input)}`,
  ),
}
