import React, { useEffect, useState } from 'react'
import { Story } from '@storybook/react'
import { AxiosResponse } from 'axios'
import useAPI from '../../../../lib/hooks/useAPI/v3/useAPI'
import APIContext, { ContextProps as APIContextProps, API } from '../../../../lib/hooks/useAPI/v3/Context'
import MyAPI from '../MyAPI'
import MySecondAPI from '../MySecondAPI'
import makeCancelable from '../../../../lib/CancelablePromise'
import CanceledError from '../../../../lib/errors/CanceledError'

const documentation = `
## API

### single API
\`\`\`tsx
<APIProvider>
  <API url="root.of.your/api" APIClass={MyAPI} />
  <App />
</APIProvider>
\`\`\`
\`\`\`tsx
const App = (): React.ReactElement => {
  const API = useAPI<MyAPI>()
  return (
    ...
  )
}
\`\`\`
\`\`\`tsx
class MyAPI extends APIClass {
  async getMyResource() {
    return this.axios.get('/my-resource')
  }
}
\`\`\`

### multiple APIs
\`\`\`tsx
<APIProvider>
  <API name="My First API" url="root.of.your/api" APIClass={MyAPI} />
  <API name="My Second API" url="root.of.your/second/api" APIClass={MySecondAPI} />
  <App />
</APIProvider>
\`\`\`
\`\`\`tsx
const App = (): React.ReactElement => {
  const API = useAPI<MyAPI>('My First API')
  return (
    ...
  )
}
\`\`\`
\`\`\`tsx
class MyAPI extends APIClass {
  async getMyResource() {
    return this.axios.get('/my-resource')
  }
}
\`\`\`
learn more [here](/story/hooks-useapi-study--page#version-3---apis-as-components)
`

export default {
  title: 'Hooks/useAPI/v3 ⭐ - APIs as components',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseAPI%2Fv3%2FContext%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseAPI%2FAPIClass%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseAPI%2Fv3%2FuseAPI%2Etsx/raw?ref=master',
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

const SingleAPIComponent = ({ timeout = false }: {timeout?: boolean}): React.ReactElement => {
  const [file, setFile] = useState(null as string)
  const MyAPIInstance = useAPI<MyAPI>()
  useEffect(() => {
    if (MyAPIInstance) {
      const cancelablePromise = makeCancelable<AxiosResponse>(
        (timeout) ? MyAPIInstance.getFileWithTimeout() : MyAPIInstance.getFile(),
      )
      cancelablePromise.promise.then((response) => setFile(response.data))
        .catch((error) => {
          if (error instanceof CanceledError || (error.response && error.response.status === 401)) {
            // Muting CanceledError and Unauthorized since it is the expected behavior
            return null
          }
          throw error
        })
      return () => cancelablePromise.cancel()
    }
    return null
  }, [MyAPIInstance])
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {(file != null) ? file : 'waiting...'}
    </div>
  )
}

const Template: Story<APIContextProps> = (args) => (
  <APIContext {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <API url="https://gitlab.com/api/v4" APIClass={MyAPI} />,
    <SingleAPIComponent />,
  ],
}

const Template2: Story<APIContextProps> = (args) => {
  const [content, setContent] = useState(
    <SingleAPIComponent timeout />,
  )
  useEffect(() => {
    setTimeout(() => {
      setContent(null)
    }, 100)
  }, [])

  return (
    <APIContext {...args}>
      {content}
    </APIContext>
  )
}

export const Unmount = Template2.bind({})
Unmount.args = {
  children: [
    <API url="https://gitlab.com/api/v4" APIClass={MyAPI} />,
  ],
}

const MultiAPIComponent1 = (): React.ReactElement => {
  const [file, setFile] = useState(null as string)
  const APIInstance = useAPI<MyAPI>('gitlab')
  useEffect(() => {
    if (APIInstance) {
      const promise = makeCancelable<AxiosResponse>(APIInstance.getFile())
      promise.promise.then((response) => setFile(response.data))
      promise.promise.catch()
      return () => promise.cancel()
    }
    return null
  }, [APIInstance])
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {(file != null) ? file : 'waiting...'}
    </div>
  )
}

const MultiAPIComponent2 = (): React.ReactElement => {
  const [file, setFile] = useState(null as string)
  const APIInstance = useAPI<MySecondAPI>('also gitlab')
  useEffect(() => {
    if (APIInstance) {
      const promise = makeCancelable<AxiosResponse>(APIInstance.getFile())
      promise.promise.then((response) => setFile(response.data))
      promise.promise.catch()
      return () => promise.cancel()
    }
    return null
  }, [APIInstance])
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {(file != null) ? file : 'waiting...'}
    </div>
  )
}

export const MultipleAPI = Template.bind({})
MultipleAPI.args = {
  children: [
    <API name="gitlab" url="https://gitlab.com/api/v4" APIClass={MyAPI} />,
    <API name="also gitlab" url="https://gitlab.com/api/v4" APIClass={MySecondAPI} />,
    <MultiAPIComponent1 />,
    <MultiAPIComponent2 />,
  ],
}

export const withToken = Template.bind({})
withToken.args = {
  children: [
    <API url="https://gitlab.com/api/v4" APIClass={MyAPI} token="your token goes here" />,
    <div>
      By checking the Network tab of the dev tools,
      you can see that the header &ldquo;Authorization&rdquo; was added
    </div>,
    <SingleAPIComponent />,
  ],
}
