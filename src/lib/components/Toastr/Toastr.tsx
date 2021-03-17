import React from 'react'

import './style.css'

export type Props = {
  children: React.ReactNode,
  isOpen?: boolean,
}

const Toastr: React.FC<Props> = ({
  children, isOpen = false,
}) => (
  <div className={`toastr ${isOpen ? '' : 'hidden'}`}>
    {children}
  </div>
)

export default Toastr
