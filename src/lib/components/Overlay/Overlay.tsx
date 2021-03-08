import React, { useCallback } from 'react'

import './style.css'

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose: () => void
}

const Overlay: React.FC<Props> = ({ children, isOpen = false, onClose }) => {
  const handleEscape = useCallback((event: React.KeyboardEvent|KeyboardEvent) => {
    if (event.key === 'Escape') { onClose() }
  }, [])
  return (
    <div
      tabIndex={0}
      className={`overlay ${isOpen ? '' : 'overlay-hidden'}`}
      onClick={onClose}
      onKeyPress={handleEscape}
      role="button">
      {children}
    </div>
  )
}

export default Overlay
