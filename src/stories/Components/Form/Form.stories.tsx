import React, { useState } from 'react'
import { Story } from '@storybook/react'
import Form, { FormState, Props as FormProps } from '../../../lib/components/Form/Form'

export default {
  title: 'Components/Form/Form',
  component: Form,
}

const Template: Story<FormProps> = () => {
  const [form, setForm] = useState(null as FormState)
  return (
    <Form onChange={setForm}>
      <input id="id-1" type="email" required minLength={10} />
      { form && !form.content['id-1'].pristine && !form.content['id-1'].validity.valid && <span>Email is not valid!</span> }
      { form && form.content['id-1'].validity.valid && <span>Yay! Nice email</span> }
      <button type="submit" disabled={!form || !form.valid}>Submit</button>
    </Form>
  )
}

export const Default = Template.bind({})
Default.args = {}

const GenericTemplate: Story<FormProps> = (args) => (
  <Form {...args} />
)

export const nestedFields = GenericTemplate.bind({})
nestedFields.args = {
  children: [
    <input id="input" />,
    <div style={{ background: 'cyan', padding: '5px' }}>
      <input id="input-nested" required />
      <div style={{ background: 'pink', padding: '5px' }}>
        <input id="input-nested-2" required />
      </div>
    </div>,
  ],
}

export const defaultValues = GenericTemplate.bind({})
defaultValues.args = {
  children: [
    <input id="input" defaultValue="Default value" />,
  ],
}

export const otherFieldTypes = GenericTemplate.bind({})
otherFieldTypes.args = {
  children: [
    <input id="input" placeholder="<input />" />,
    <textarea id="textarea" placeholder="<textarea />" />,
    <select id="select" placeholder="<select />">
      <option>Maybe</option>
      <option>Blouge</option>
      <option>200</option>
      <option>Also</option>
    </select>,
  ],
}

export const withEventHandlers = GenericTemplate.bind({})
withEventHandlers.args = {
  children: [
    /* eslint-disable-next-line */
    <input id="input" placeholder="logs on change" onChange={() => console.log('input changed')} />,
    /* eslint-disable-next-line */
    <input id="input" placeholder="logs on blur" onBlur={() => console.log('input blur')} />,
  ],
}
