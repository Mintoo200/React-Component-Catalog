import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const Controls = ({ children }: Props): React.ReactElement => (
  <div className="controls">
    {children}
  </div>
)

export default Controls
