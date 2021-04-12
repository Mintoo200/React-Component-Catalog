import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const Label: React.FC<Props> = ({ children }) => (
  <>{children}</>
)

export default Label
