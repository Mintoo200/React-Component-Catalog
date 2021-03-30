import React, { useEffect } from 'react'

import './style.css'

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  timer?: number,
  onClick?: () => void,
}

const Toastr = ({
  children, isOpen = false, onClose = null, timer = null, onClick = null,
}: Props): React.ReactElement => {
  useEffect(() => {
    if (timer != null) {
      if (onClose == null) {
        throw new Error('onClose is required with timer.')
      }
      const timeout = setTimeout(onClose, timer)
      return () => clearTimeout(timeout)
    }
    return null
  }, [isOpen])
  if (onClick != null) {
    return (
      <div
        className={`toastr ${isOpen ? '' : 'hidden'}`}
        onClick={onClick}
        role="presentation">
        {children}
      </div>
    )
  }
  return (
    <div className={`toastr ${isOpen ? '' : 'hidden'}`}>
      {children}
    </div>
  )
}

export default Toastr
