import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useID from '../../../lib/hooks/useID/useID'

const documentation = `
## API

\`\`\`tsx
const MyComponent = () => {
  const id = useID()
  return (
    <button id={id} />
  )
}
\`\`\`

The ID is unique to the instance, not the render:

\`\`\`tsx
<>
  <MyComponent />       /* id: 1 */
  <MyComponent />       /* id: 2 */
  <MyOtherComponent />  /* id: 3 */
</>

// re-render

<>
  <MyComponent />       /* id: still 1 */
  <MyComponent />       /* id: still 2 */
  <MyOtherComponent />  /* id: still 3 */
</>
\`\`\`

This is to avoid unnecessary DOM mutations.
`

export default {
  title: 'Hooks/useID/useID',
  parameters: {
    docs: {
      description: {
        component: documentation,
      },
    },
  },
}

const Template: Story = () => {
  function MyComponentWithID({ children }: {children?: React.ReactNode}) {
    const id = useID()
    return (
      <div id={id.toString()}>
        {`My ID is #${id}`}
        {children}
      </div>
    )
  }

  function StoryComponent() {
    const [renderCount, setRenderCount] = useState(0)
    return (
      <>
        <button onClick={() => setRenderCount(renderCount + 1)} type="button">
          {`set state and re-render (current render count is ${renderCount})`}
        </button>
        <MyComponentWithID>
          <MyComponentWithID />
        </MyComponentWithID>
        <MyComponentWithID />
      </>
    )
  }
  return (
    <StoryComponent />
  )
}

export const Default = Template.bind({})
Default.args = {}
