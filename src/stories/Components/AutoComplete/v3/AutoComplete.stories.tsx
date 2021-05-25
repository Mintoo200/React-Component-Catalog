import React, { useEffect, useState } from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v3/AutoComplete'
import Input from '../../../../lib/components/AutoComplete/v3/Input'
import Options from '../../../../lib/components/AutoComplete/v3/Options'
import Option from '../../../../lib/components/AutoComplete/v3/Option'
import documentation from './AutoComplete.doc'

export default {
  title: 'Components/AutoComplete/v3 ⭐ - Option list without datalist',
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

const Template: Story<AutoCompleteProps> = (args) => (
  <>
    <label id="my-label" htmlFor="autocomplete">AutoComplete</label>
    <AutoComplete {...args} id="autocomplete" aria-labelledby="my-label" />
  </>
)

export const Default = Template.bind({})
Default.args = {
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

const AsyncTemplate: Story<AutoCompleteProps> = (args) => {
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
      <label id="my-label-2" htmlFor="autocomplete-2">AutoComplete</label>
      <AutoComplete {...args} id="autocomplete-2" aria-labelledby="my-label-2" onChange={setInput}>
        <Input />
        <Options>
          {options.map((option: Country) => (
            <Option key={option.code} value={option.code}>{option.name}</Option>
          ))}
        </Options>
      </AutoComplete>
    </>
  )
}

export const Async = AsyncTemplate.bind({})
Async.args = {
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(`submitted country with code ${input}`),
}
