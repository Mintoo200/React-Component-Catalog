import React, { useContext } from 'react'
import { Context } from './Modal'

export type Props = {
  children: React.ReactNode,
}

const ModalTitle: React.FC<Props> = ({ children }) => {
  const { onClose } = useContext(Context)
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
