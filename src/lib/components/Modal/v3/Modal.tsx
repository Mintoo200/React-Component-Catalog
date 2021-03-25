import React from 'react'
import Overlay from '../../Overlay/Overlay'
import ModalTitle from './ModalTitle'

import '../style.css'

export type Props = {
  children: React.ReactElement|React.ReactElement[],
  isOpen?: boolean,
  onClose: () => void,
}

const Modal = ({ isOpen = false, onClose, children }: Props): React.ReactElement => (
  <Overlay isOpen={isOpen} onClose={onClose}>
    <div className="overlay-wrapper">
      <div
        className="modal"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        role="presentation">
        {React.Children.map(children, (child) => {
          if (child.type === ModalTitle) {
            return React.cloneElement(child, {
              onClose,
            })
          }
          return child
        })}
      </div>
    </div>
  </Overlay>
)

export default Modal
