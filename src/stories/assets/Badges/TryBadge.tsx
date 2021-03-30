import React from 'react'
import LinkTo from '@storybook/addon-links/react'

import './style.css'

type Props = {
  kind?: string,
  story?: string
}

const TryBadge = ({ kind, story }: Props): React.ReactElement => (
  <LinkTo kind={kind} story={story}>
    <button className="badge try-it" type="button">
      Try it
    </button>
  </LinkTo>
)

export default TryBadge
