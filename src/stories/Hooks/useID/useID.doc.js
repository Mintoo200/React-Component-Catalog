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

export default documentation
