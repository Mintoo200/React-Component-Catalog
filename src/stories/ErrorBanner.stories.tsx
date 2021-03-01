import React from 'react'
import { Story } from '@storybook/react'
import ErrorBanner, { Props as ErrorBannerProps } from '../lib/components/ErrorBanner/ErrorBanner'

export default {
  title: 'Error Banner',
  component: ErrorBanner,
  parameters: {
    docs: {
      description: {
        component: 'Source code comming soon...',
      },
    },
  },
}

const Template: Story<ErrorBannerProps> = (args): JSX.Element => <ErrorBanner {...args} />

export const Default = Template.bind({})
Default.args = {
  message: 'There is an error!',
}

export const WithChild = Template.bind({})
WithChild.args = {
  children: [
    <button type="button">Ok</button>,
  ],
}

export const WithMessageAndChild = Template.bind({})
WithMessageAndChild.args = {
  children: [
    <button type="button">Ok</button>,
  ],
  message: 'Message',
}
