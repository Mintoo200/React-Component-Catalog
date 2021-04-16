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
        <h1>{children}</h1>
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
