import React from 'react'

import './tip.css'

type Props = {
  children: React.ReactNode
}

const Tip: React.FC<Props> = ({ children }) => (
  <div className="tip-box">
    <div className="tip">Tip</div>
    <div className="tip-content">{children}</div>
  </div>
)

export default Tip
