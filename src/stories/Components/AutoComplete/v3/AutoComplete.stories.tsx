import React from 'react'
import { Story } from '@storybook/react'
import AutoComplete, { Props as AutoCompleteProps } from '../../../../lib/components/AutoComplete/v3/AutoComplete'
import Input from '../../../../lib/components/AutoComplete/v3/Input'
import Options from '../../../../lib/components/AutoComplete/v3/Options'
import Option from '../../../../lib/components/AutoComplete/v3/Option'

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
learn more [here](/story/components-autocomplete-study--page#version-3--option-list-without-datalist)
`

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
  /* eslint-disable-next-line no-alert */
  onSubmit: (input) => alert(input),
}
