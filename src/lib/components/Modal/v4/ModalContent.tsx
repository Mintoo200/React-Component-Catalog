import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const ModalContent = ({ children }: Props): React.ReactElement => (
  <>{children}</>
)

export default ModalContent
