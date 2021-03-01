import React from 'react'
import Tabs from '../../lib/components/Tabs/v2/Tabs'
import TabList from '../../lib/components/Tabs/v2/TabList'
import TabContent from '../../lib/components/Tabs/v2/TabContent'
import Tab from '../../lib/components/Tabs/v2/Tab'

import CodeBrackets from '../assets/code-brackets.svg'
import Comments from '../assets/comments.svg'

export default {
  title: 'Tabs/v2',
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
    <TabList key="TabList">
      <Tab>Tab1</Tab>
      <Tab>Tab2</Tab>
    </TabList>,
    <TabContent key="TabContent">
      <div>Content 1</div>
      <div>Content 2</div>
    </TabContent>,
  ],
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  children: [
    <TabList key="TabList">
      <Tab>
        <img
          src={CodeBrackets}
          style={{ maxWidth: '100px' }}
          alt="This is an icon" />
      </Tab>
      <Tab>
        <img
          src={Comments}
          style={{ maxWidth: '100px' }}
          alt="This is an icon" />
      </Tab>
    </TabList>,
    <TabContent key="TabContent">
      <div>Content 1</div>
      <div>Content 2</div>
    </TabContent>,

  ],
}
