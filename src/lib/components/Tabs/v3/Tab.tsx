import React from 'react'

type Props = {
  children: React.ReactNode,
  active?: boolean,
  onClick?: () => void,
}

const Tab = ({ children, active = false, onClick }: Props): React.ReactElement => (
  <button
    type="button"
    className={`${active ? 'active' : ''}`}
    onClick={onClick}>
    {children}
  </button>
)

export default Tab
