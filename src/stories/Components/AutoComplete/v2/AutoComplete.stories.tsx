import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v2/AutoComplete'
import Input from '../../../../lib/components/AutoComplete/v2/Input'
import Options from '../../../../lib/components/AutoComplete/v2/Options'
import Option from '../../../../lib/components/AutoComplete/v2/Option'

const documentation = `
## API
\`\`\`tsx
<AutoComplete onSubmit={(input: string) => null}>
    <Input />
    <Options>
      <Option>Test</Option>
      <Option value="Test 2">Also a test</Option>
    </Options>
</AutoComplete>
\`\`\`
learn more [here](/story/components-autocomplete-study--page#version-1--options-as-function)
`

export default {
  title: 'Components/AutoComplete/v2 - Option list without datalist',
  component: AutoComplete,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FAutoComplete%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FContext%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FInput%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FOption%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FOptions%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FAutoComplete%2Fv2%2FReducer%2Etsx/raw?ref=master',
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
  /* eslint-disable-next-line */
  onSubmit: (input) => alert(input)
}
