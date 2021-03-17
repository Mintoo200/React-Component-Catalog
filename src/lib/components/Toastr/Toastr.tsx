import React, { useEffect } from 'react'

import './style.css'

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  timer?: number,
}

const Toastr: React.FC<Props> = ({
  children, isOpen = false, onClose = null, timer = null,
}) => {
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
  return (
    <div className={`toastr ${isOpen ? '' : 'hidden'}`}>
      {children}
    </div>
  )
}

export default Toastr
