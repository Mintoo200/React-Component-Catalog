import React from 'react'

import '../style.css'

type Props = {
  active?: boolean,
  label: React.ReactNode,
  /* eslint-disable-next-line react/no-unused-prop-types */
  children?: React.ReactNode,
  onClick?: () => void,
  onKeyPress?: () => void,
}

const Tab = ({
  active = false, label, onClick, onKeyPress,
}: Props): React.ReactElement => (
  <>
    <button
      tabIndex={0}
      className={`tab ${active ? 'active' : ''}`}
      onClick={onClick}
      onKeyPress={onKeyPress}
      type="button">
      {label}
    </button>
  </>
)

export default Tab
