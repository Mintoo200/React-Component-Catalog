import React from 'react'
import ModalContent from '../v2/ModalContent'
import ModalTitle from '../v2/ModalTitle'

import '../style.css'
import Modal from '../v2/Modal'

export type Props = {
  children: React.ReactNode,
  title: string,
  isOpen?: boolean,
  onClose: () => void,
}

const ModalWrapper: React.FC<Props> = ({
  children, title, isOpen = false, onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalTitle onClose={onClose}>{title}</ModalTitle>
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export default ModalWrapper
