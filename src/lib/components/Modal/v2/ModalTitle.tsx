import React from 'react'

export type Props = {
  children: React.ReactNode,
  onClose?: () => void,
}

const ModalTitle: React.FC<Props> = ({ children, onClose }) => (
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

export default ModalTitle
