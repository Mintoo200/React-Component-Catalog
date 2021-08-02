import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Modal, { Props as ModalProps } from '../../../../lib/components/Modal/v4/Modal'
import ModalContent from '../../../../lib/components/Modal/v4/ModalContent'
import ModalTitle from '../../../../lib/components/Modal/v4/ModalTitle'
import documentation from './Modal.doc'

export default {
  title: 'Components/Modal/v4 ⭐ ♿ - Sub-components with Context',
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
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv4%2E1%2FModal%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv4%2E1%2FModalTitle%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fv4%2E1%2FModalContent%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FModal%2Fstyle%2Ecss/raw?ref=master',
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

export const withNonModal = Template.bind({})
withNonModal.args = {
  children: [
    <ModalTitle>This is my modal</ModalTitle>,
    <ModalContent>
      Try clicking outside of the modal or pressing &lsquo;Escape&rsquo;!
    </ModalContent>,
    <div>This is neither in &lsquo;ModalTitle&rsquo; nor in &lsquo;ModalContent&rsquo;.</div>,
  ],
}
