import React from 'react'
import { Story } from '@storybook/react'
import Dropdown, { Props as DropdownProps } from '../../../../lib/components/Dropdown/v1/Dropdown'
import Menu from '../../../../lib/components/Dropdown/v1/Menu'
import documentation from './Dropdown.doc'

export default {
  title: 'Components/Dropdown/v1 ⭐ - Label as prop',
  component: Dropdown,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv1%2FDropdown%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FDropdown%2Fv1%2FMenu%2Etsx/raw?ref=master',
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
    <nav aria-label="My Navigation Menu">
      <Dropdown {...args} />
    </nav>
    <div style={{ height: '300px', background: 'cyan' }} role="main" />
  </>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <button type="button">Link 1</button>,
    <Menu label={<button type="button">Menu 1</button>}>
      <button type="button">Link 2</button>
      <Menu label={<button type="button">Submenu 1</button>}>
        <button type="button">Link 3</button>
        <Menu label={<button type="button">Submenu 2</button>}>
          <button type="button">Link 4</button>
        </Menu>
        <button type="button">Link 5</button>
      </Menu>
      <button type="button">Link 6</button>
    </Menu>,
  ],
}
