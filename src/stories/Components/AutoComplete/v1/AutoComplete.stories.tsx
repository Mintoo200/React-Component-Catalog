import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v1/AutoComplete'

const documentation = `
## API
\`\`\`tsx
<AutoComplete
  getOptions={async () => {
    // API calls
    return [
      { value: 'My First Value', label: 'This is the label for the first value' },
      { value: 'My Second Value', label: 'Also with a label' },
      { value: 'My Third Value' },
      { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
    ]
  }}
  onSubmit={(input: string) => null} />
\`\`\`
learn more [here](/story/components-autocomplete-study--page#version-1--options-as-function)
`

export default {
  title: 'Components/AutoComplete/v1 - Options as function',
  component: AutoComplete,
  parameters: {
    componentSource: {
      url: 'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv1%2FAutoComplete%2Etsx/raw?ref=master',
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
  <AutoComplete {...args} />
)

export const Default = Template.bind({})
Default.args = {
  getOptions: async (input) => [
    { value: 'My First Value', label: 'This is the label for the first value' },
    { value: 'My Second Value', label: 'Also with a label' },
    { value: 'My Third Value' },
    { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
  ].filter(({ value }) => value.toLowerCase().includes((input ?? '').toLowerCase())),
  /* eslint-disable-next-line */
  onSubmit: (input) => alert(input),
}

export const UnorderedResolution = Template.bind({})
UnorderedResolution.args = {
  getOptions: async (input) => {
    const result = [
      { value: 'My First Value', label: 'This is the label for the first value' },
      { value: 'My Second Value', label: 'Also with a label' },
      { value: 'My Third Value' },
      { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
    ].filter(({ value }) => value.toLowerCase().includes((input ?? '').toLowerCase()))
    await new Promise((resolve) => setTimeout(resolve, result.length * 1000))
    /* eslint-disable */
    console.log(input)
    return result
  },
  /* eslint-disable-next-line */
  onSubmit: (input) => alert(input),
}
