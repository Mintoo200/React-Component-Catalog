import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Toastr, { Props as ToastrProps } from '../../../lib/components/Toastr/Toastr'
import documentation from './Toastr.doc'

export default {
  title: 'Components/Toastr/Toastr',
  component: Toastr,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FToastr%2FToastr%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FToastr%2Fstyle%2Ecss/raw?ref=master',
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

const TemplateWithButton: Story<ToastrProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Open toastr
      </button>
      <Toastr {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>x</button>
        <div>Hello</div>
      </Toastr>
    </>
  )
}

export const Default = TemplateWithButton.bind({})
Default.args = {
}

const Template: Story<ToastrProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Open toastr
      </button>
      <Toastr {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
export const withTimer = Template.bind({})
withTimer.args = {
  children: [
    <div>Hello</div>,
  ],
  timer: 1000,
}

export const withClickHandler = Template.bind({})
withClickHandler.args = {
  children: [
    <div>Hello</div>,
  ],
  timer: 3000,
  /* eslint-disable-next-line no-alert */
  onClick: () => alert('You clicked'),
}
