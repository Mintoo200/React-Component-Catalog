import React, { useContext } from 'react'
import NoContextError from '../../../errors/NoContextError'
import useID from '../../../hooks/useID/useID'
import Overlay from '../../Overlay/Overlay'

import '../style.css'

export type ContextType = {
  onClose: () => void,
  id: string,
}

const Context = React.createContext<ContextType>(undefined)

export function useModal(): ContextType {
  const context = useContext(Context)

  if (context == null) {
    throw new NoContextError()
  }

  return context
}

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose: () => void,
}

const Modal = ({ isOpen = false, onClose, children }: Props): React.ReactElement => {
  const id = `modal-${useID()}`
  return (
    <Context.Provider value={{ onClose, id }}>
      <Overlay isOpen={isOpen} onClose={onClose}>
        <div
          className="modal"
          role="dialog"
          aria-modal
          aria-labelledby={`${id}-title`}>
          {children}
        </div>
      </Overlay>
    </Context.Provider>
  )
}

export default Modal
