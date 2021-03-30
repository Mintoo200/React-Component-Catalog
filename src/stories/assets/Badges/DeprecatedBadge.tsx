import React from 'react'

import './style.css'

const DeprecatedBadge = (): React.ReactElement => (
  <button className="badge deprecated" type="button" disabled>
    Deprecated
  </button>
)

export default DeprecatedBadge
