import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const ModalContent: React.FC<Props> = ({ children }) => (
  <>{children}</>
)

export default ModalContent
