import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v0/AutoComplete'

export default {
  title: 'Components/AutoComplete/v0 - Option list with datalist',
  component: AutoComplete,
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
}
