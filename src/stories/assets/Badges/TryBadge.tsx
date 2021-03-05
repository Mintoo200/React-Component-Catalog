import React from 'react'

import './style.css'

type Props = {
  href: string,
}

const TryBadge: React.FC<Props> = ({ href }) => (
  <a href={href}>
    <button className="badge try-it" type="button">
      Try it
    </button>
  </a>
)

export default TryBadge
