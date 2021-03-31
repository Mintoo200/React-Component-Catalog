import React from 'react'

import './style.css'

export type Props = {
  message?: string,
  children?: React.ReactNode,
}

const ErrorBanner = ({ message = '', children = [] }: Props): React.ReactElement => (
  <div className="error-banner" role="dialog">
    {`❌ ${message} `}
    {children}
  </div>
)

export default ErrorBanner
