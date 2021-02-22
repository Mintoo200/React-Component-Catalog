import React from 'react'

import './style.css'

type Props = {
  message?: string,
  children?: React.ReactNode,
}

const ErrorBanner = ({ message = '', children = [] }: Props): JSX.Element => (
  <div className="error-banner">
    {`❌ ${message} `}
    {children}
  </div>
)

export default ErrorBanner
