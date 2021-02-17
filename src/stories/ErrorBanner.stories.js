import React from 'react'
import ErrorBanner from '../lib/components/ErrorBanner/ErrorBanner'
// import ErrorBannerCode from '../lib/components/ErrorBanner/ErrorBanner.code'

export default {
  title: 'Error Banner',
  component: ErrorBanner,
  parameters: {
    docs: {
      description: {
        component: "Source code comming soon..."
        // component: `\`\`\`js
        // ${ErrorBannerCode}
        // \`\`\``
      }
    }
  }
}

const Template = (args) => <ErrorBanner {...args} />

export const Default = Template.bind({})
Default.args = {
  message: "There is an error!",
}

export const WithChild = Template.bind({})
WithChild.args = {
  children: [
    <button>Ok</button>
  ]
}

export const WithMessageAndChild = Template.bind({})
WithMessageAndChild.args = {
  children: [
    <button>Ok</button>
  ],
  message: "Message"
}