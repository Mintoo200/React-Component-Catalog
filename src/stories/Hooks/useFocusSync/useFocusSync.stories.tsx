import React, { useRef } from 'react'
import { Story } from '@storybook/react'
import useFocusSync, { SyncProvider } from '../../../lib/hooks/useFocusSync/useFocusSync'
import documentation from './useFocusSync.doc'

import './style.css'

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
