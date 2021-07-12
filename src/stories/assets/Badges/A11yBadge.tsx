import React from 'react'

import './style.css'

type Props = {
  href: string,
}

const A11yBadge = ({ href }: Props): React.ReactElement => (
  <a href={href}>
    <button className="badge a11y" type="button">
      A11y
    </button>
  </a>
)

export default A11yBadge
