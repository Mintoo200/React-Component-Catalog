import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const Controls: React.FC<Props> = ({ children }) => (
  <div className="controls">
    {children}
  </div>
)

export default Controls
