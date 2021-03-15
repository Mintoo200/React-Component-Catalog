import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Modal, { Props as ModalProps } from '../../../../lib/components/Modal/v1/Modal'

const documentation = `
## API
\`\`\`xml
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Title">
  Try clicking outside of the modal or pressing 'Escape'!
</Modal>
\`\`\`
learn more [here](/story/modal-study--page#version-1)
`

export default {
  title: 'Components/Modal/v1',
  component: Modal,
  argTypes: {
    isOpen: {
      control: false,
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv1%2FModal%2Etsx/raw?ref=master',
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

const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Click Me!</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'This is my modal!',
  children: [
    'Try clicking outside of the modal or pressing \'Escape\'!',
  ],
}
