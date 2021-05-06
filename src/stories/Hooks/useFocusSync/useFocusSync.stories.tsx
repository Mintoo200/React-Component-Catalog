import React, { useRef } from 'react'
import { Story } from '@storybook/react'
import useFocusSync, { SyncProvider } from '../../../lib/hooks/useFocusSync/useFocusSync'

import './style.css'

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

export default {
  title: 'Hooks/useFocusSync/useFocusSync',
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseFocusSync%2FuseFocusSync%2Etsx/raw?ref=master',
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
  function FocusComponent() {
    const ref = useRef<HTMLButtonElement>()
    const { hasFocus, syncFocus } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus} className="button">
        {hasFocus ? 'Has focus' : 'Does not have focus'}
      </button>
    )
  }
  return (
    <SyncProvider>
      <FocusComponent />
      <FocusComponent />
    </SyncProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}

const TemplateWithMultipleProviders: Story = () => {
  function FocusComponent() {
    const ref = useRef<HTMLButtonElement>()
    const { hasFocus, syncFocus } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus} className="button">
        {hasFocus ? 'Has focus' : 'Does not have focus'}
      </button>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent />
      </SyncProvider>
      <SyncProvider>
        <FocusComponent />
      </SyncProvider>
    </>
  )
}

export const WithMultipleProviders = TemplateWithMultipleProviders.bind({})
WithMultipleProviders.args = {}

const TemplateWithIndirectFocus: Story = () => {
  function FocusComponent() {
    const ref = useRef<HTMLDivElement>()
    const { hasIndirectFocus, hasDirectFocus, syncFocus } = useFocusSync(ref)
    return (
      <div onFocus={syncFocus} onBlur={syncFocus} ref={ref} tabIndex={0} role="button" className="button">
        {hasDirectFocus ? 'Has direct focus' : hasIndirectFocus ? 'Has indirect focus' : 'Does not have focus'}
        <button type="button" className="button">
          Focus Me!
        </button>
      </div>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent />
      </SyncProvider>
    </>
  )
}

export const IndirectFocus = TemplateWithIndirectFocus.bind({})
IndirectFocus.args = {}

const TemplateWithSyncedChildrenFocus: Story = () => {
  const FocusComponent: React.FC = ({ children }) => {
    const ref = useRef<HTMLDivElement>()
    const {
      hasIndirectFocus, hasDirectFocus, syncedChildHasFocus, syncFocus,
    } = useFocusSync(ref)
    return (
      <div onFocus={syncFocus} onBlur={syncFocus} ref={ref} tabIndex={0} role="button" className="button">
        {(() => {
          let result
          if (hasDirectFocus) {
            result = 'Has direct focus'
          } else if (syncedChildHasFocus) {
            result = 'Synced child has focus'
          } else if (hasIndirectFocus) {
            result = 'Has indirect focus'
          } else {
            result = 'Does not have focus'
          }
          return result
        })()}
        {children}
      </div>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent>
          <button type="button" className="button">This button is not synced</button>
          <FocusComponent>
            <button type="button" className="button">This button is not synced</button>
          </FocusComponent>
        </FocusComponent>
      </SyncProvider>
    </>
  )
}

export const SyncedChildFocus = TemplateWithSyncedChildrenFocus.bind({})
SyncedChildFocus.args = {}

const TemplateSyncedChildrenMultipleProviders: Story = () => {
  const FocusComponent: React.FC = ({ children }) => {
    const ref = useRef<HTMLDivElement>()
    const {
      hasIndirectFocus, hasDirectFocus, syncedChildHasFocus, syncFocus,
    } = useFocusSync(ref)
    return (
      <div onFocus={syncFocus} onBlur={syncFocus} ref={ref} tabIndex={0} role="button" className="button">
        {(() => {
          let result
          if (hasDirectFocus) {
            result = 'Has direct focus'
          } else if (syncedChildHasFocus) {
            result = 'Synced child has focus'
          } else if (hasIndirectFocus) {
            result = 'Has indirect focus'
          } else {
            result = 'Does not have focus'
          }
          return result
        })()}
        {children}
      </div>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent>
          <button type="button" className="button">This button is not synced</button>
          <SyncProvider>
            <FocusComponent>
              <button type="button" className="button">This button is not synced</button>
            </FocusComponent>
          </SyncProvider>
        </FocusComponent>
      </SyncProvider>
    </>
  )
}

export const SyncedChildWithMultipleProviders = TemplateSyncedChildrenMultipleProviders.bind({})
SyncedChildWithMultipleProviders.args = {}
