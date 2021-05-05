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
        <FocusComponent />
      </SyncProvider>
    </>
  )
}

export const IndirectFocus = TemplateWithIndirectFocus.bind({})
IndirectFocus.args = {}
