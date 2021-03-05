import React from 'react'

import './tip.css'

type Props = {
  children: React.ReactNode
}

const Tip = ({ children }: Props): React.ReactNode => (
  <div className="tip-box">
    <div className="tip">Tip</div>
    <div className="tip-content">{children}</div>
  </div>
)

export default Tip
