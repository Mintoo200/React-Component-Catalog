import React from 'react'
import Tabs from '../../lib/components/Tabs/v1/Tabs'
import Tab from '../../lib/components/Tabs/v1/Tab'

import CodeBrackets from '../assets/code-brackets.svg'
import Comments from '../assets/comments.svg'

export default {
  title: 'Tabs/v1',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Source code comming soon...',
      },
    },
  },
}

const Template = (args): JSX.Element => <Tabs {...args} />

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
        <img
          src={CodeBrackets}
          style={{ maxWidth: '100px' }}
          alt="This is an icon" />
      )}
      key="1">
      This is the content of the first tab
    </Tab>,
    <Tab
      label={(
        <img
          src={Comments}
          style={{ maxWidth: '100px' }}
          alt="This is an icon" />
      )}
      key="2">
      This is the content of the second tab
    </Tab>,
  ],
}
