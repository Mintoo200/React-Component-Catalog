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

export default documentation
