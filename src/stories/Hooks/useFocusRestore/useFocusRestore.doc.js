const documentation = `
Stores the last focussed element when given false, then restores focus to the element when given true.

## API

\`\`\`tsx
const MyComponent = () => {
  const [open, setOpen] = useState(false)
  useFocusRestore(!open)
  return (
    ...
  )
}
\`\`\`
`

export default documentation
