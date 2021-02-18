import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const propTypes = {
  message: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  message: '',
  children: [],
}

const ErrorBanner = ({ message, children }) => (
  <div className="error-banner">
    {`❌ ${message} `}
    {children}
  </div>
)

ErrorBanner.propTypes = propTypes
ErrorBanner.defaultProps = defaultProps

export default ErrorBanner
