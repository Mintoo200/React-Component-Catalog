import React from 'react'
import ModalContent from '../v3/ModalContent'
import ModalTitle from '../v3/ModalTitle'

import '../style.css'
import Modal from '../v3/Modal'

export type Props = {
  children: React.ReactNode,
  title: string,
  isOpen?: boolean,
  onClose: () => void,
}

const ModalWrapper = ({
  children, title, isOpen = false, onClose,
}: Props): React.ReactElement => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalTitle onClose={onClose}>{title}</ModalTitle>
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export default ModalWrapper
