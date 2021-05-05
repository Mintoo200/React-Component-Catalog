import React, { useRef } from 'react'
import { Story } from '@storybook/react'
import useFocusSync, { SyncProvider } from '../../../lib/hooks/useFocusSync/useFocusSync'

export default {
  title: 'Hooks/useFocusSync/useFocusSync',
}

const Template: Story = () => {
  function FocusComponent() {
    const ref = useRef<HTMLButtonElement>()
    const { hasFocus, syncFocus } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus}>
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
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus}>
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
    const ref = useRef<HTMLButtonElement>()
    const { hasIndirectFocus, hasDirectFocus, syncFocus } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus} tabIndex={0}>
        {hasDirectFocus ? 'Has direct focus' : hasIndirectFocus ? 'Has indirect focus' : 'Does not have focus'}
        <button type="button">
          Focus Me!
        </button>
      </button>
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
    const ref = useRef<HTMLButtonElement>()
    const {
      hasIndirectFocus, hasDirectFocus, syncedChildHasFocus, syncFocus,
    } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus} tabIndex={0}>
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
      </button>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent>
          <button type="button">This button is not synced</button>
          <FocusComponent>
            <button type="button">This button is not synced</button>
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
    const ref = useRef<HTMLButtonElement>()
    const {
      hasIndirectFocus, hasDirectFocus, syncedChildHasFocus, syncFocus,
    } = useFocusSync(ref)
    return (
      <button type="button" ref={ref} onFocus={syncFocus} onBlur={syncFocus} tabIndex={0}>
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
      </button>
    )
  }
  return (
    <>
      <SyncProvider>
        <FocusComponent>
          <button type="button">This button is not synced</button>
          <SyncProvider>
            <FocusComponent>
              <button type="button">This button is not synced</button>
            </FocusComponent>
          </SyncProvider>
        </FocusComponent>
      </SyncProvider>
    </>
  )
}

export const SyncedChildWithMultipleProviders = TemplateSyncedChildrenMultipleProviders.bind({})
SyncedChildWithMultipleProviders.args = {}
