import React from 'react'
import { Story } from '@storybook/react'
import Tabs, { Props as TabsProps } from '../../lib/components/Tabs/v1/Tabs'
import Tab from '../../lib/components/Tabs/v1/Tab'

import { ReactComponent as CodeBrackets } from '../assets/code-brackets.svg'
import { ReactComponent as Comments } from '../assets/comments.svg'

const documentation = `
## API
\`\`\`xml
<Tabs>
  <Tab label="Tab 1">
    Content 1
  </Tab>
  <Tab label="Tab 2">
    Content 2
  </Tab>
</Tabs>
\`\`\`
learn more [here](/story/tabs-study--page#version-1)
`

export default {
  title: 'Tabs/v1',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: documentation,
      },
    },
  },
}

const Template: Story<TabsProps> = (args): JSX.Element => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  children: [
    <Tab label="This is the first tab" key="1">
      This is the content of the first tab
    </Tab>,
    <Tab label="This is the second tab" key="2">
      This is the content of the second tab
    </Tab>,
  ],
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  children: [
    <Tab
      label={(
        <CodeBrackets />
      )}
      key="1">
      This is the content of the first tab
    </Tab>,
    <Tab
      label={(
        <Comments />
      )}
      key="2">
      This is the content of the second tab
    </Tab>,
  ],
}
