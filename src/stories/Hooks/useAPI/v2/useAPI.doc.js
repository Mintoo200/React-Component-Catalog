const documentation = `
## API

\`\`\`tsx
<APIProvider url="root.of.your/api" APIClass={MyAPI}>
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
learn more [here](/story/hooks-useapi-study--page#version-2---only-single-api-as-props)
`

export default documentation
