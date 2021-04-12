import React from 'react'

import '../style.css'

export type Props = {
  children: React.ReactNode,
}

const Dropdown: React.FC<Props> = ({ children }) => (
  <ul className="dropdown">
    {React.Children.map(children, (child, index) => (
      <li key={index}>
        {child}
      </li>
    ))}
  </ul>
)

export default Dropdown
