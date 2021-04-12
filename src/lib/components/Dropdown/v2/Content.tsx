import React from 'react'

export type Props = {
  children: React.ReactNode,
}

const Content: React.FC<Props> = ({ children }) => (
  <>{children}</>
)

export default Content
