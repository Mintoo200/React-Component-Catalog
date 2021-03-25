import React from 'react'

export type Props = {
  children: React.ReactNode,
  onClose?: () => void,
}

const ModalTitle: React.FC<Props> = ({ children, onClose }) => (
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

export default ModalTitle
