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

export default documentation
