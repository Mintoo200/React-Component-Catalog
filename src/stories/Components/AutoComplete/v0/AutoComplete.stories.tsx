import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v0/AutoComplete'

const documentation = `
## API
\`\`\`tsx
<AutoComplete
  options={[
    { value: 'My First Value', label: 'This is the label for the first value' },
    { value: 'My Second Value', label: 'Also with a label' },
    { value: 'My Third Value' },
    { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
  ]}
  onSubmit={(input: string) => null} />
\`\`\`
learn more [here](/story/components-autocomplete-study--page#version-0---option-list-with-datalist)
`

export default {
  title: 'Components/AutoComplete/v0 - Option list with datalist',
  component: AutoComplete,
  parameters: {
    componentSource: {
      url: 'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv0%2FAutoComplete%2Etsx/raw?ref=master',
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
  options: [
    { value: 'My First Value', label: 'This is the label for the first value' },
    { value: 'My Second Value', label: 'Also with a label' },
    { value: 'My Third Value' },
    { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
  ],
  /* eslint-disable-next-line */
  onSubmit: (input) => alert(input),
}
