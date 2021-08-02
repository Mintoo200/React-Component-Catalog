import React, { useContext } from 'react'
import NoContextError from '../../../errors/NoContextError'
import Overlay from '../../Overlay/Overlay'

import '../style.css'

const Context = React.createContext(undefined)

export function useModal(): {onClose: () => void} {
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

const Modal = ({ isOpen = false, onClose, children }: Props): React.ReactElement => (
  <Context.Provider value={{ onClose }}>
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal>
        {children}
      </div>
    </Overlay>
  </Context.Provider>
)

export default Modal
