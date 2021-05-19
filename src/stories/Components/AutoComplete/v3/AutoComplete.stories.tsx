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
      <Option>Test</Option>
      <Option value="Test 2">Also a test</Option>
    </Options>,
  ],
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(input),
}

const AsyncTemplate: Story<AutoCompleteProps> = (args) => {
  const [options, setOptions] = useState<string[]>([])
  const [input, setInput] = useState('')
  useEffect(() => {
    setOptions([])
    const timeout = setTimeout(() => setOptions([
      'options 1',
      'options 2',
      'options 3',
      'options 4',
    ].filter((option) => option.includes(input))), 2000)
    return () => clearTimeout(timeout)
  }, [input])
  return (
    <>
      <label id="my-label-2" htmlFor="autocomplete-2">AutoComplete</label>
      <AutoComplete {...args} id="autocomplete-2" aria-labelledby="my-label-2" onChange={setInput}>
        <Input />
        <Options>
          {options.map((option: string) => (
            <Option key={option}>{option}</Option>
          ))}
        </Options>
      </AutoComplete>
    </>
  )
}

export const Async = AsyncTemplate.bind({})
Async.args = {
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(input),
}
