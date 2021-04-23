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
    <Menu label={<button type="button">Menu 2</button>}>
      <button type="button">Link 7</button>
      <Menu label={<button type="button">Submenu 3</button>}>
        <button type="button">Link 8</button>
        <Menu label={<button type="button">Submenu 4</button>}>
          <button type="button">Link 9</button>
        </Menu>
        <button type="button">Link 10</button>
      </Menu>
      <button type="button">Link 11</button>
    </Menu>,
    <button type="button">ALink 12</button>,
    <button type="button">Link 13</button>,
  ],
  'aria-label': 'My navigation menu',
}

type PopupType = boolean | 'dialog' | 'menu' | 'false' | 'true' | 'listbox' | 'tree' | 'grid'
type MyButtonProps = {
  children?: React.ReactNode,
  tabIndex?: number,
  role?: string,
  'aria-haspopup'?: PopupType,
  'aria-expanded'?: boolean,
}
const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ children, ...a11y }, ref) => (
    <button
      ref={ref}
      type="button"
      tabIndex={a11y.tabIndex}
      role={a11y.role}
      aria-haspopup={a11y['aria-haspopup']}
      aria-expanded={a11y['aria-expanded']}
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(`click on ${children}`)}>
      {children}
    </button>
  ),
)

export const WithCustomButtons = Template.bind({})
WithCustomButtons.args = {
  children: [
    <MyButton>Link 1</MyButton>,
    <Menu label={<MyButton>Menu 1</MyButton>}>
      <MyButton>Link 2</MyButton>
      <Menu label={<MyButton>Submenu 1</MyButton>}>
        <MyButton>Link 3</MyButton>
        <Menu label={<MyButton>Submenu 2</MyButton>}>
          <MyButton>Link 4</MyButton>
        </Menu>
        <MyButton>Link 5</MyButton>
      </Menu>
      <MyButton>Link 6</MyButton>
    </Menu>,
    <Menu label={<MyButton>Menu 2</MyButton>}>
      <MyButton>Link 7</MyButton>
      <Menu label={<MyButton>Submenu 3</MyButton>}>
        <MyButton>Link 8</MyButton>
        <Menu label={<MyButton>Submenu 4</MyButton>}>
          <MyButton>Link 9</MyButton>
        </Menu>
        <MyButton>Link 10</MyButton>
      </Menu>
      <MyButton>Link 11</MyButton>
    </Menu>,
    <MyButton>ALink 12</MyButton>,
    <MyButton>Link 13</MyButton>,
  ],
  'aria-label': 'My navigation menu',
}
