import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useFocus from '../../../lib/hooks/useFocus/useFocus'

import './style.css'

const documentation = `
## API

\`\`\`tsx
const MyComponent = ({ hasFocus: boolean }) => {
  const ref = useFocus<HTMLButtonElement>(hasFocus)
  return (
    <button ref={ref} />
  )
}
\`\`\`
`

export default {
  title: 'Hooks/useFocus/useFocus',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseFocus%2FuseFocus%2Etsx/raw?ref=master',
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
  const [hasFocus, setFocus] = useState(false)
  const ref1 = useFocus<HTMLButtonElement>(hasFocus)
  const ref2 = useFocus<HTMLButtonElement>(!hasFocus)
  return (
    <div>
      <button className="focus-button" ref={ref2} onClick={() => setFocus(true)} type="button">Focus button 2</button>
      <button className="focus-button" ref={ref1} onClick={() => setFocus(false)} type="button">Focus button 1</button>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
