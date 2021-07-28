import React, { useState } from 'react'
import { Story } from '@storybook/react'
import FocusTrap from '../../../lib/components/FocusTrap/FocusTrap'
import documentation from './FocusTrap.doc'

import './style.css'

export default {
  title: 'Components/FocusTrap/FocusTrap',
  component: FocusTrap,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FFocusTrap%2FFocusTrap%2Etsx/raw?ref=master',
      ],
      language: 'javascript',
    },
    docs: {
      description: {
        component: documentation,
      },
    },
  },
}

const Template: Story = () => {
  const [active, activate] = useState(false)
  return (
    <>
      <button type="button">Outside</button>
      <div className="box">
        <FocusTrap active={active}>
          {/* eslint-disable-next-line jsx-a11y/tabindex-no-positive */}
          <button type="button" tabIndex={1}>tabIndex = 1</button>
          <button type="button" tabIndex={0}>tabIndex = 0</button>
          <button type="button" tabIndex={-1}>tabIndex = -1</button>
          <div className="box">not focussable</div>
          <button onClick={() => activate(!active)} type="button">toggle trap</button>
        </FocusTrap>
      </div>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
