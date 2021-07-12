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

You can provide a RefObject to be focussed as secondary argument if needed:

\`\`\`tsx
const ref = useRef<HTMLElement>()
const focusRef = useFocus(true, ref)
// ref === focusRef
\`\`\`
`

export default documentation
