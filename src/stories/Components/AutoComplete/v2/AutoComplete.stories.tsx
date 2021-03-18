import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v2/AutoComplete'
import Input from '../../../../lib/components/AutoComplete/v2/Input'
import Options from '../../../../lib/components/AutoComplete/v2/Options'
import Option from '../../../../lib/components/AutoComplete/v2/Option'

export default {
  title: 'Components/AutoComplete/v2 - Option list without datalist',
  component: AutoComplete,
}

const Template: Story<AutoCompleteProps> = (args) => (
  <AutoComplete {...args} />
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
  /* eslint-disable */
  onSubmit: (input) => alert(input)
}
