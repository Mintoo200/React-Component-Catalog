import React from 'react'

import './style.css'

export type Props = {
  message?: string,
  children?: React.ReactNode,
}

const ErrorBanner: React.FC<Props> = ({ message = '', children = [] }) => (
  <div className="error-banner">
    {`❌ ${message} `}
    {children}
  </div>
)

export default ErrorBanner
