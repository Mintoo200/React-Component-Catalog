import React from 'react'
import Tabs from '../lib/components/Tabs/Tabs'
// import TabsCode from '../lib/components/Tabs/Tabs.code'
import Tab from '../lib/components/Tabs/Tab'
// import TabCode from '../lib/components/Tabs/Tab.code'

export default {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: "Source code comming soon..."
        // component: `\`\`\`js
        // // Tabs.jsx
        // ${TabsCode}
        // \`\`\`
        // \`\`\`js
        // // Tab.jsx
        // ${TabCode}
        // \`\`\``
      }
    }
  }
}

const Template = (args) => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  children: [
    <Tab label="This is the first tab">
      This is the content of the first tab
    </Tab>,
    <Tab label="This is the second tab">
      This is the content of the second tab
    </Tab>
  ]
}