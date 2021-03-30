import React from 'react'

export type Props = {
  isActive?: boolean,
  children: React.ReactNode,
}

const Slide = ({ isActive = false, children }: Props): React.ReactElement => (
  <div className={`slide ${isActive ? '' : 'hidden'}`}>
    {children}
  </div>
)

export default Slide
