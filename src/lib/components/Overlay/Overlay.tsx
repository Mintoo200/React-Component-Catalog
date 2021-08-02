import React, { useCallback, useEffect } from 'react'
import useFocusRestore from '../../hooks/useFocusRestore/useFocusRestore'
import useFocusTrap from '../../hooks/useFocusTrap/useFocusTrap'

import './style.css'

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose: () => void
}

const Overlay = ({ children, isOpen = false, onClose }: Props): React.ReactElement => {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen)
  const handleEscape = useCallback((event: React.KeyboardEvent|KeyboardEvent) => {
    if (event.key === 'Escape') { onClose() }
  }, [])
  const handleClick = useCallback((event: React.MouseEvent) => {
    // ignore bubbling and propagation
    if (event.target === event.currentTarget) {
      onClose()
    }
  }, [trapRef, onClose])
  useFocusRestore(!isOpen)
  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  })
  return (
    <div
      ref={trapRef}
      className={`overlay ${isOpen ? '' : 'hidden'}`}
      onClick={handleClick}
      onKeyPress={handleEscape}
      role="presentation">
      {children}
    </div>
  )
}

export default Overlay
