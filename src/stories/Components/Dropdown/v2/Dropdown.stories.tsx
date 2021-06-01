import React from 'react'
import { Story } from '@storybook/react'
import Dropdown, { Props as DropdownProps } from '../../../../lib/components/Dropdown/v2/Dropdown'
import Menu from '../../../../lib/components/Dropdown/v2/Menu'
import Label from '../../../../lib/components/Dropdown/v2/Label'
import Content from '../../../../lib/components/Dropdown/v2/Content'
import documentation from './Dropdown.doc'

export default {
  title: 'Components/Dropdown/v2 - Label as component',
  component: Dropdown,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv2%2FDropdown%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv2%2FMenu%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv2%2FLabel%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv2%2FContent%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fstyle%2Ecss/raw?ref=master',
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

const Template: Story<DropdownProps> = (args) => (
  <>
    <Dropdown {...args} />
    <div style={{ height: '300px', background: 'cyan' }} />
  </>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <button type="button">Link 1</button>,
    <Menu>
      <Label><button type="button">Menu 1</button></Label>
      <Content>
        <button type="button">Link 2</button>
        <Menu>
          <Label><button type="button">Submenu 1</button></Label>
          <Content>
            <button type="button">Link 3</button>
            <Menu>
              <Label><button type="button">Submenu 2</button></Label>
              <Content><button type="button">Link 4</button></Content>
            </Menu>
            <button type="button">Link 5</button>
          </Content>
        </Menu>
        <button type="button">Link 6</button>
      </Content>
    </Menu>,
  ],
}

export const WithoutContent = Template.bind({})
WithoutContent.args = {
  children: [
    <button type="button">Link 1</button>,
    <Menu>
      <Label><button type="button">Menu 1</button></Label>
      <button type="button">Link 2</button>
      <Menu>
        <Label><button type="button">Submenu 1</button></Label>
        <button type="button">Link 3</button>
        <Menu>
          <Label><button type="button">Submenu 2</button></Label>
          <button type="button">Link 4</button>
        </Menu>
        <button type="button">Link 5</button>
      </Menu>
      <button type="button">Link 6</button>
    </Menu>,
  ],
}
