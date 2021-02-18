import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  active: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  // children: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.node),
  //   PropTypes.node,
  // ]),
  onClick: PropTypes.func,
}

const defaultProps = {
  active: false,
  label: 'default tab label',
  // children: [],
  onClick: () => {},
}

const Tab = ({ active, label, onClick }) => (
  <button
    className={`tab ${active ? 'tab-active' : ''}`}
    onClick={onClick}
    type="button">
    {label}
  </button>
)

Tab.propTypes = propTypes
Tab.defaultProps = defaultProps

export default Tab
