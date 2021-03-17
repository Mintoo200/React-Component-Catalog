import React from 'react'

export type Props = {
  isActive?: boolean,
  children: React.ReactNode,
}

const Slide: React.FC<Props> = ({ isActive = false, children }) => (
  <div className={`slide ${isActive ? '' : 'hidden'}`}>
    {children}
  </div>
)

export default Slide
