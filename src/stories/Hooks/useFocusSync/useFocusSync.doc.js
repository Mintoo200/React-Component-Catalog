const documentation = `
## API

\`\`\`tsx
type SyncObject = {
  hasFocus: boolean,
  hasDirectFocus: boolean,
  hasIndirectFocus: boolean,
  syncedChildHasFocus: boolean,
  syncFocus: (event: React.FocusEvent<HTMLElement>) => void,
}

const MyComponent = () => {
  const ref = useRef<HTMLButtonElement>()
  const sync: SyncObject = useFocusSync(ref)
  return (
    <button ref={ref} onFocus={sync.syncFocus} onBlur={sync.syncFocus}>
      Click Me!
    </button>
  )
}

const App = () => (
  <SyncProvider>
    <MyComponent />
  </SyncProvider>
)
\`\`\`

\`syncFocus\` is a callback that syncs the focus between all synced component. It needs to be called on each synced component on focus and blur:

\`\`\`tsx
<button ref={ref} onFocus={syncFocus} onBlur={syncFocus} />
\`\`\`

\`hasFocus\` is true if the given ref **or any of its children** is focussed:

\`\`\`tsx
<div synced focussed>     {/* <-- hasFocus is true */}
  <div />
</div>

<div synced>              {/* <-- hasFocus is true */}
  <div focussed />
</div>
\`\`\`

\`hasDirectFocus\` is true if the given ref is directly focussed:

\`\`\`tsx
<div synced focussed>     {/* <-- hasDirectFocus is true */}
  <div />
</div>

<div synced>              {/* <-- hasDirectFocus is false */}
  <div focussed />
</div>
\`\`\`

\`hasIndirectFocus\` is true if the given ref is strictly indirectly focussed:

\`\`\`tsx
<div synced focussed>     {/* <-- hasIndirectFocus is false */}
  <div />
</div>

<div synced>              {/* <-- hasIndirectFocus is true */}
  <div focussed />
</div>
\`\`\`

\`syncedChildHasFocus\` is true if the given ref is strictly indirectly focussed and a synced child of this ref has focus **and only if the synced child uses the same SyncProvider** (cf. [this story](#synced-child-with-multiple-providers)):

\`\`\`tsx
<div synced focussed>     {/* <-- syncedChildHasFocus is false (focus is direct) */}
  <div />
  <div synced />
</div>

<div synced>              {/* <-- syncedChildHasFocus is false (focus is not on a synced child) */}
  <div focussed />
  <div synced />
</div>

<div synced>              {/* <-- syncedChildHasFocus is true */}
  <div />
  <div synced focussed />
</div>

<div synced>              {/* <-- syncedChildHasFocus is true (focus is indirectly in a synced child) */}
  <div />
  <div synced>
    <div focussed />
  </div>
</div>
\`\`\`

\`syncedChildHasFocus\` can be used when handling events for children but to allow a nested component to handle events for its own children:

\`\`\`tsx
const MyNestedComponent = () => {
  const ref = useRef()
  const {hasFocus, syncFocus} = useFocusSync(ref)
  return (
    <>...</>
  )
}

const MyComponent = () => {
  const ref = useRef()
  const {hasFocus, syncedChildHasFocus, syncFocus} = useFocusSync(ref)
  function doStuff() {
    if (hasFocus && !syncedChildHasFocus) {
      // do stuff when focus on any li item but not on MyNestedComponent
    }
  }
  return (
    <ul ref={ref} onKeyPress={doStuff} onFocus={syncFocus} onBlur={syncFocus}>
      <li>...</li>
      <li><MyNestedComponent /></li>
      <li>...</li>
    </ul>
  )
}
\`\`\`
`

export default documentation
