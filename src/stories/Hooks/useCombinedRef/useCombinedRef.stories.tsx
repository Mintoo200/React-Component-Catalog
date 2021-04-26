import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useCombinedRef from '../../../lib/hooks/useCombinedRef/useCombinedRef'

export default {
  title: 'Hooks/useCombinedRef/useCombinedRef',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseCombinedRef%2FuseCombinedRef%2Etsx/raw?ref=master',
      ],
      language: 'javascript',
    },
  },
}

const Template: Story = () => {
  const InnerComponent = React.forwardRef<HTMLButtonElement>((props, forwardedRef) => {
    const ref = useCombinedRef(forwardedRef)
    const [text, setText] = useState('Click Me!')
    return (
      <>
        <p>{`Button ref has text "${ref?.current?.textContent}"`}</p>
        <button
          ref={ref}
          type="button"
          onClick={() => setText(text === 'Click Me!' ? 'You Clicked Me !' : 'Click Me!')}>
          {text}
        </button>
      </>
    )
  })

  const RefForwarder = () => {
    const [text, setText] = useState('')
    const refCallback = (instance: HTMLElement) => {
      setText(instance?.textContent)
    }
    return (
      <>
        <p>{`Ref callback was last called with text "${text}"`}</p>
        <InnerComponent ref={refCallback} />
      </>
    )
  }

  return (
    <RefForwarder />
  )
}

export const Default = Template.bind({})
Default.args = {}
