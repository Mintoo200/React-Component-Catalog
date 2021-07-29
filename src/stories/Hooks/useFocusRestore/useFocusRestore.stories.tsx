import React, { useLayoutEffect, useRef, useState } from 'react'
import { Story } from '@storybook/react'
import useFocusRestore from '../../../lib/hooks/useFocusRestore/useFocusRestore'
import Overlay from '../../../lib/components/Overlay/Overlay'
// import documentation from './useFocus.doc'

export default {
  title: 'Hooks/useFocusRestore/useFocusRestore',
  parameters: {
    componentSource: {
      url: [
        // 'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseFocus%2FuseFocus%2Etsx/raw?ref=master',
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
  const ref = useRef<HTMLButtonElement>()
  const [isOpen, setOpen] = useState(false)
  useLayoutEffect(() => {
    if (isOpen) {
      ref?.current?.focus()
    }
  }, [isOpen])
  useFocusRestore(!isOpen)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>toggle overlay</button>
      <Overlay onClose={() => setOpen(false)} isOpen={isOpen}>
        <button type="button" ref={ref}>I grab the focus</button>
      </Overlay>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
