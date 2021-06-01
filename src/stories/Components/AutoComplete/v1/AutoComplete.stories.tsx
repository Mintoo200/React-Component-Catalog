import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v1/AutoComplete'
import documentation from './Autocomplete.doc'

export default {
  title: 'Components/AutoComplete/v1 - Option list with datalist',
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
  options: [
    { value: 'My First Value', label: 'This is the label for the first value' },
    { value: 'My Second Value', label: 'Also with a label' },
    { value: 'My Third Value' },
    { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
  ],
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(input),
}
