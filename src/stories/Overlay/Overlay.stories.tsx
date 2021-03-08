import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Overlay, { Props as OverlayProps } from '../../lib/components/Overlay/Overlay'

import './style.css'

const documentation = `
## API
\`\`\`xml
<Overlay isOpen onClose={() => setIsOpen()}>
  <div onClick={(event: React.MouseEvent) => event.stopPropagation()}>
    Content of the overlay
  </div>
</Overlay>
\`\`\`
**Remember to stop the click propagation if you want the overlay to stay open when you click on your content!** \n
e.g.:\n
\`\`\`js
const childClickHandler = (event: React.MouseEvent) => {
  event.stopPropagation()
}
\`\`\`

learn more [here](/story/overlay-study--page)
`

export default {
  title: 'Overlay/Overlay',
  component: Overlay,
  argTypes: {
    isOpen: {
      control: false,
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FOverlay%2FOverlay%2Etsx/raw?ref=master',
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

const Template: Story<OverlayProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Try Me!</button>
      <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <div className="overlay-wrapper">
      <div
        className="overlay-content"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        onKeyPress={() => null}
        role="presentation">
        This is the content of the overlay.
        <br />
        Try clicking outside this box or pressing &lsquo;Esc&rsquo;!
      </div>
    </div>,
  ],
}
