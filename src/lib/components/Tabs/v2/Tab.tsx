import React from 'react'

type Props = {
  children: React.ReactNode,
  active?: boolean,
  onClick?: () => void,
}

const Tab: React.FC<Props> = ({ children, active = false, onClick }) => (
  <button
    type="button"
    className={`${active ? 'active' : ''}`}
    onClick={onClick}>
    {children}
  </button>
)

export default Tab
