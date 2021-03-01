import React from 'react'

type Props = {
  children: React.ReactNode,
  active?: boolean,
  onClick?: () => void,
}

const Tab = ({ children, active = false, onClick }: Props): JSX.Element => (
  <button
    type="button"
    className={`tab ${active ? 'tab-active' : ''}`}
    onClick={onClick}>
    {children}
  </button>
)

export default Tab
