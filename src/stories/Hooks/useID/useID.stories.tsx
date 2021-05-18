import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useID from '../../../lib/hooks/useID/useID'

export default {
  title: 'Hooks/useID/useID',
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
