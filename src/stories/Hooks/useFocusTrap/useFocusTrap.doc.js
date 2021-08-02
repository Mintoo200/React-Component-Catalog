const documentation = `
## API

\`\`\`tsx
function Component() {
  const [active, setActive] = useState(false)
  const trapRef = useFocusTrap<HTMLDivElement>(active)
  return (
    <div ref={trapRef}>
      ...
    </div>
  )
}
\`\`\`

You can provide a ref to the hook to use custom refs in your component:

\`\`\`tsx
const ref = useRef()
const trapRef = useFocusTrap<HTMLDivElement>(active, ref)
// trapRef === ref
\`\`\`

<p className="warning">
  Contrary to the <a href="https://github.com/focus-trap/focus-trap">focus-trap library</a>, this component allows focus of the body of the page and anything that is not part of the page (e.g. the url bar, previous, next and refresh buttons, ...).
  This is mainly to comply with <a href="https://www.w3.org/TR/WCAG20-TECHS/G21.html">ensuring that users are not trapped in content</a>.
</p>
`

export default documentation
