import React, { useContext } from 'react'
import { Context } from './Modal'

export type Props = {
  children: React.ReactNode,
}

const ModalTitle: React.FC<Props> = ({ children }) => {
  const { onClose } = useContext(Context)
  return (
    <>
      <div className="modal-title">
        <h1 className="modal-title-content">{children}</h1>
        <button
          className="modal-quit-button"
          type="button"
          onClick={onClose}>
          x
        </button>
      </div>
      <hr />
    </>
  )
}

export default ModalTitle
