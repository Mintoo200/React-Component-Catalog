import React from 'react'
import { Story } from '@storybook/react'
import Tabs, { Props as TabsProps } from '../../lib/components/Tabs/v2/Tabs'
import TabList from '../../lib/components/Tabs/v2/TabList'
import TabContent from '../../lib/components/Tabs/v2/TabContent'
import Tab from '../../lib/components/Tabs/v2/Tab'

import { ReactComponent as CodeBrackets } from '../assets/code-brackets.svg'
import { ReactComponent as Comments } from '../assets/comments.svg'

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

const Template: Story<TabsProps> = (args): JSX.Element => <Tabs {...args} />

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
        <CodeBrackets />
      </Tab>
      <Tab>
        <Comments />
      </Tab>
    </TabList>,
    <TabContent key="TabContent">
      <div>Content 1</div>
      <div>Content 2</div>
    </TabContent>,

  ],
}
