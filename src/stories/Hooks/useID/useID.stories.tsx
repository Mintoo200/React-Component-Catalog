import React, { useState } from 'react'
import { Story } from '@storybook/react'
import useID from '../../../lib/hooks/useID/useID'
import documentation from './useID.doc'

export default {
  title: 'Hooks/useID/useID',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseID%2FuseID%2Etsx/raw?ref=master',
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
