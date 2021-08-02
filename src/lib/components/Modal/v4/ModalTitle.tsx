import React from 'react'
import { useModal } from './Modal'

export type Props = {
  children: React.ReactNode,
}

const ModalTitle = ({ children }: Props): React.ReactElement => {
  const { onClose } = useModal()
  return (
    <>
      <div className="title">
        <h2>{children}</h2>
        <button
          className="quit"
          type="button"
          onClick={onClose}>
          x
        </button>
      </div>
    </>
  )
}

export default ModalTitle
