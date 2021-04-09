import React from 'react'
import { Story } from '@storybook/react'
import Dropdown, { Props as DropdownProps } from '../../../lib/components/Dropdown/Dropdown'
import Menu from '../../../lib/components/Dropdown/Menu'

import './style.css'

export default {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
}

const Template: Story<DropdownProps> = (args) => (
  <>
    <Dropdown {...args} />
    <div style={{ height: '300px', background: 'cyan' }} />
  </>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <button type="button" tabIndex={0}>Link 1</button>,
    <Menu label={<button type="button" tabIndex={0}>Menu 1</button>}>
      <button type="button" tabIndex={0}>Link 2</button>
      <Menu label={<button type="button" tabIndex={0}>Submenu 1</button>}>
        <button type="button" tabIndex={0}>Link 3</button>
        <Menu label={<button type="button" tabIndex={0}>Submenu 2</button>}>
          <button type="button" tabIndex={0}>Link 4</button>
        </Menu>
        <button type="button" tabIndex={0}>Link 5</button>
      </Menu>
      <button type="button" tabIndex={0}>Link 6</button>
    </Menu>,
  ],
}
