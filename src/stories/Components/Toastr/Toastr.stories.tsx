import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Toastr, { Props as ToastrProps } from '../../../lib/components/Toastr/Toastr'

export default {
  title: 'Components/Toastr/Toastr',
  component: Toastr,
}

const TemplateWithButton: Story<ToastrProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Open toastr
      </button>
      <Toastr {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>x</button>
        <div>Hello</div>
      </Toastr>
    </>
  )
}

export const Default = TemplateWithButton.bind({})
Default.args = {
}
