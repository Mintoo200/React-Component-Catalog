import React from 'react'
import { Story } from '@storybook/react'
import Dropdown, { Props as DropdownProps } from '../../../../lib/components/Dropdown/v2/Dropdown'
import Menu from '../../../../lib/components/Dropdown/v2/Menu'
import Label from '../../../../lib/components/Dropdown/v2/Label'
import Content from '../../../../lib/components/Dropdown/v2/Content'

export default {
  title: 'Components/Dropdown/v2',
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
    <Menu>
      <Label><button type="button" tabIndex={0}>Menu 1</button></Label>
      <Content>
        <button type="button" tabIndex={0}>Link 2</button>
        <Menu>
          <Label><button type="button" tabIndex={0}>Submenu 1</button></Label>
          <Content>
            <button type="button" tabIndex={0}>Link 3</button>
            <Menu>
              <Label><button type="button" tabIndex={0}>Submenu 2</button></Label>
              <Content><button type="button" tabIndex={0}>Link 4</button></Content>
            </Menu>
            <button type="button" tabIndex={0}>Link 5</button>
          </Content>
        </Menu>
        <button type="button" tabIndex={0}>Link 6</button>
      </Content>
    </Menu>,
  ],
}
