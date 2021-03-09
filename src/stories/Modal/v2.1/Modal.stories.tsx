import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Modal, { Props as ModalProps } from '../../../lib/components/Modal/v2.1/Modal'
import ModalContent from '../../../lib/components/Modal/v2.1/ModalContent'
import ModalTitle from '../../../lib/components/Modal/v2.1/ModalTitle'

const documentation = `
## API
\`\`\`xml
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalTitle>My title</ModalTitle>
  <ModalContent>Try clicking outside of the modal or pressing 'Escape'!</ModalContent>
</Modal>
\`\`\`
learn more [here](/story/modal-study--page#version-2)
`

export default {
  title: 'Modal/v2.1',
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
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv2%2E1%2FModal%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv2%2E1%2FModalTitle%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv2%2E1%2FModalContent%2Etsx/raw?ref=master',
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
  children: [
    <ModalTitle>This is my modal</ModalTitle>,
    <ModalContent>
      Try clicking outside of the modal or pressing &lsquo;Escape&rsquo;!
    </ModalContent>,
  ],
}
