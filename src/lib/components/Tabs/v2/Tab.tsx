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

const Tab: React.FC<Props> = ({
  active = false, children, label, onClick, onKeyPress,
}) => (
  <>
    <button
      tabIndex={0}
      className={`tab ${active ? 'active' : ''}`}
      onClick={onClick}
      onKeyPress={onKeyPress}
      type="button">
      {label}
    </button>
    <template title={`${label}-content`}>{children}</template>
  </>
)

export default Tab
