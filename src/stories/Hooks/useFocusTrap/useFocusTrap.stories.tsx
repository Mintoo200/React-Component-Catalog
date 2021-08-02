import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useFocusTrap from '../../../lib/hooks/useFocusTrap/useFocusTrap'
// import documentation from './useFocusTrap.doc'

import './style.css'

export default {
  title: 'Hooks/useFocusTrap/useFocusTrap',
  parameters: {
    componentSource: {
      url: [
        // 'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseFocusSync%2FuseFocusSync%2Etsx/raw?ref=master',
      ],
      language: 'javascript',
    },
    docs: {
      description: {
        // component: documentation,
      },
    },
  },
}

const Template: Story = () => {
  function Trap() {
    const [active, setActive] = useState(false)
    const trap = useFocusTrap<HTMLDivElement>(active)
    return (
      <div ref={trap} className={`trap ${active ? 'active' : 'inactive'}`}>
        <p>{`trap is ${active ? 'active' : 'inactive'}`}</p>
        <button type="button" onClick={() => setActive(!active)}>toggle trap</button>
        <button type="button">in tab order</button>
      </div>
    )
  }
  return (
    <>
      <Trap />
      <button type="button">Not in tab order when trap is active</button>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
