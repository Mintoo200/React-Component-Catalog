import React from 'react'
import { Story } from '@storybook/react'
import Tabs, { Props as TabsProps } from '../../../../lib/components/Tabs/v3/Tabs'
import TabList from '../../../../lib/components/Tabs/v3/TabList'
import TabContent from '../../../../lib/components/Tabs/v3/TabContent'
import Tab from '../../../../lib/components/Tabs/v3/Tab'

import { ReactComponent as CodeBrackets } from '../../../assets/code-brackets.svg'
import { ReactComponent as Comments } from '../../../assets/comments.svg'
import useTabs from '../../../../lib/components/Tabs/v3/Context'

const documentation = `
## API
\`\`\`tsx
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabContent>
    <div>Content 1</div>
    <div>Content 2</div>
  </TabContent>
</Tabs>
\`\`\`
learn more [here](/story/components-tabs-study--page#version-3---sub-components)
`

export default {
  title: 'Components/Tabs/v3 ⭐ - Sub-components',
  component: Tabs,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FTabs%2Fv3%2FTabs%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FTabs%2Fv3%2FTabList%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2flib%2fcomponents%2fTabs%2fv3%2fTab%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2flib%2fcomponents%2fTabs%2fv3%2fTabContent%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FTabs%2Fstyle%2Ecss/raw?ref=master',
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

const Template: Story<TabsProps> = (args) => <Tabs {...args} />

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

export const BottomTabs = Template.bind({})
BottomTabs.args = {
  children: [
    <TabContent key="TabContent">
      <div>Content 1</div>
      <div>Content 2</div>
    </TabContent>,
    <TabList key="TabList">
      <Tab>Tab1</Tab>
      <Tab>Tab2</Tab>
    </TabList>,
  ],
}

export const InterceptContext = Template.bind({})
const Component = () => {
  const { activeIndex, setActiveIndex } = useTabs()
  return (
    <div>
      <div>{`The current index is ${activeIndex}`}</div>
      <button onClick={() => setActiveIndex(1)} type="button">set the current index to 1</button>
    </div>
  )
}
InterceptContext.args = {
  children: [
    <Component />,
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
const code = `
const Component = () => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  return (
    <div>
      <div>{\`The current index is \${activeIndex}\`}</div>
      <button onClick={() => setActiveIndex(1)} type="button">set the current index to 1</button>
    </div>
  )
}
`
InterceptContext.parameters = {
  docs: {
    source: {
      code,
    },
  },
}
