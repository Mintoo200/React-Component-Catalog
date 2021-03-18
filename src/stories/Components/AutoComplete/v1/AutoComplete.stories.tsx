import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v1/AutoComplete'

export default {
  title: 'Components/AutoComplete/v1 - Options as function',
  component: AutoComplete,
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
}
