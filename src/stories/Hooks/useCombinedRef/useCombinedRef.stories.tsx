import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useCombinedRef from '../../../lib/hooks/useCombinedRef/useCombinedRef'

const documentation = `
This hook synchronizes any number of ref and returns a new RefObject.  
It will call any ref callback and update any RefObject given with the returned ref.  

## API

\`\`\`tsx
const MyComponent = React.forwardRef<HTMLButtonElement, Props>(
  (props, forwardedRef) => {
    const ref = useCombinedRef(forwardedRef)
    return (
      <button ref={ref} />
    )
  }
)
\`\`\`

This hook takes a variadic ref array, allowing for any number of ref given as argument as follow: \`useCombinedRef(ref1, ref2, ref3, ...)\`
`

export default {
  title: 'Hooks/useCombinedRef/useCombinedRef',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseCombinedRef%2FuseCombinedRef%2Etsx/raw?ref=master',
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
