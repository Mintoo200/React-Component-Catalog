import React from 'react'

import './style.css'

const DeprecatedBadge: React.FC = () => (
  <button className="badge deprecated" type="button" disabled>
    Deprecated
  </button>
)

export default DeprecatedBadge
