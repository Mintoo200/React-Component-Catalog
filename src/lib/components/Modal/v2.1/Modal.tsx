import React from 'react'
import Overlay from '../../Overlay/Overlay'

import '../style.css'

export const Context = React.createContext({
  onClose: () => null,
})

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose: () => void,
}

const Modal = ({ isOpen = false, onClose, children }: Props): React.ReactElement => (
  <Context.Provider value={{ onClose }}>
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="overlay-wrapper">
        <div
          className="modal"
          onClick={(event: React.MouseEvent) => event.stopPropagation()}
          role="presentation">
          {children}
        </div>
      </div>
    </Overlay>
  </Context.Provider>
)

export default Modal
